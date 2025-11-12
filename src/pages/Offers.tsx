import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import PriceFilter from '../components/PriceFilter';
import { useCart } from '../context/CartContext'; // ✅ Importa el contexto del carrito
import './Offers.css';
import bannerm from '../assets/img/bannerm.jpg';

const formatPrice = (price: number) => {
  return `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const Offers: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const API_URL = import.meta.env.VITE_API_URL;

  const { addToCart } = useCart(); // ✅ obtenemos la función del contexto

  // ✅ Cargar productos desde el backend
  useEffect(() => {
    fetch(`${API_URL}/llantas`)
      .then(res => res.json())
      .then((data) => {
        setProducts(data);

        if (data.length > 0) {
          const prices = data.map((p: any) => p.price);
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange([min, max]);
          setFilteredProducts(data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  // ✅ Filtrado y ordenamiento dinámico
  useEffect(() => {
    let newFiltered = [...products];

    newFiltered = newFiltered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortOrder) {
      case 'price-asc':
        newFiltered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        newFiltered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        newFiltered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        newFiltered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredProducts(newFiltered);

  }, [sortOrder, priceRange, products]);

  // ✅ Agregar producto al carrito
  const handleAddToCart = (product: any) => {
    const productToAdd = {
      id: product.id,
      name: product.title || product.name,
      price: product.price,
      image: product.image || product.img || '/default.jpg',
      quantity: 1
    };

    addToCart(productToAdd);
    console.log("🛒 Añadido al carrito:", productToAdd);
  };

  const handleSortChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };

  return (
    <div className="offers-page">
      <div className="banner-container">
        <img src={bannerm} alt="Banner de ofertas" className="offers-banner" />
      </div>

      <div className="controls-wrapper">
        <div className="filter-group-left">
          <PriceFilter min={minPrice} max={maxPrice} onRangeChange={handlePriceChange} />
        </div>
        <div className="filter-group-right">
          <div className="sort-control">
            <label htmlFor="sort-order">
              Ordenar por:
              <select
                id="sort-order"
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortOrder}
              >
                <option value="default">Por defecto</option>
                <option value="price-asc">Precio: más bajo a más alto</option>
                <option value="price-desc">Precio: más alto a más bajo</option>
                <option value="name-asc">Nombre: A-Z</option>
                <option value="name-desc">Nombre: Z-A</option>
              </select>
            </label>
          </div>
          <div className="product-count">
            Mostrando {filteredProducts.length} de {products.length} resultados
          </div>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
            price={formatPrice(product.price)}
            oldPrice={product.oldPrice ? formatPrice(product.oldPrice) : undefined}
            onAddToCart={() => handleAddToCart(product)} // ✅ ahora lo pasa al card
          />
        ))}
      </div>
    </div>
  );
};

export default Offers;
