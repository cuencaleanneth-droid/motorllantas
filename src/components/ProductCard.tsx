import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
  imageUrl: string;
  title: string;
  grip: string;
  rating: number;
  stock: number;
  shipping: string;
  oldPrice?: string;
  price: string;
  brandLogo: string;
  discount: number;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  grip,
  rating,
  stock,
  shipping,
  oldPrice,
  price,
  brandLogo,
  discount,
  onAddToCart,
}) => {
  return (
    <div className="product-card">
      <div className="discount-badge">{`-${discount}%`}</div>
      <img src={imageUrl} alt={title} className="product-image" />
      <div className="product-info">
        <p className="product-name">{title}</p>
        <p className="product-grip">{grip}</p>
        <div className="product-rating">
          {'★'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </div>
        <p className="product-stock">{`Stock: ${stock} disponibles`}</p>
        <p className="product-shipping">{shipping}</p>
        <div className="product-price">
          {oldPrice && <span className="old-price">{oldPrice}</span>}
          <span className="current-price">{price}</span>
        </div>
        <div className="product-brand">
          <img src={brandLogo} alt="Brand" />
        </div>
        <button className="add-to-cart-button" onClick={onAddToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
