import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

interface Product {
  id: number;
  sku: number;
  name: string;
  title: string;
  brand: string;
  model: string;
  car_type: string;
  regular_price: number;
  stock: number;
  availability: string;
  image_link?: string;
  link?: string;
}

const ITEMS_PER_PAGE = 10;

const AdminInventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    sku: 0,
    name: "",
    model: "",
    car_type: "",
    regular_price: 0,
    stock: 0,
    availability: "in stock",
  });
  const [loading, setLoading] = useState(false);

  const [sortBy, setSortBy] = useState<"brand" | "model">("brand");
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/inventory`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Ordenar productos cada vez que cambian
  useEffect(() => {
    const sorted = [...products].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
    setFilteredProducts(sorted);
    setCurrentPage(1);
  }, [products, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      sku: product.sku,
      name: product.name,
      model: product.model,
      car_type: product.car_type,
      regular_price: product.regular_price,
      stock: product.stock,
      availability: product.availability,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) return;

    try {
      await fetch(`${API_URL}/inventory/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await fetch(`${API_URL}/inventory/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Administrar Inventario</h2>

      {/* Filtros de orden */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <label>
          Ordenar por:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "brand" | "model")}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="brand">Marca</option>
            <option value="model">Modelo</option>
          </select>
        </label>
      </div>

      {/* Formulario de edición */}
      {editingId !== null && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#4c524bff",
          }}
        >
          <h3>Editar Producto</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <input
              type="number"
              placeholder="SKU"
              value={form.sku}
              onChange={(e) =>
                setForm({ ...form, sku: Number(e.target.value) })
              }
              required
            />
            <input
              type="text"
              placeholder="Nombre"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Modelo"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Tipo de vehículo"
              value={form.car_type}
              onChange={(e) =>
                setForm({ ...form, car_type: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={form.regular_price}
              onChange={(e) =>
                setForm({ ...form, regular_price: Number(e.target.value) })
              }
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
              required
            />
            <select
              value={form.availability}
              onChange={(e) =>
                setForm({ ...form, availability: e.target.value })
              }
            >
              <option value="in stock">In Stock</option>
              <option value="out of stock">Out of Stock</option>
            </select>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <button type="submit" style={{ marginRight: "0.5rem" }}>
              Guardar
            </button>
            <button type="button" onClick={() => setEditingId(null)}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Tabla de productos */}
      {loading ? (
        <p>🔄 Cargando inventario...</p>
      ) : (
        <>
          <table
            border={1}
            cellPadding={5}
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead style={{ backgroundColor: "#000000ff" }}>
              <tr>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Tipo Vehículo</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Disponibilidad</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p) => (
                <tr key={p.id}>
                  <td>{p.sku}</td>
                  <td>{p.name}</td>
                  <td>{p.model}</td>
                  <td>{p.brand}</td>
                  <td>{p.car_type}</td>
                  <td>${p.regular_price}</td>
                  <td>{p.stock}</td>
                  <td>{p.availability}</td>
                  <td>
                    {p.image_link ? (
                      <img
                        src={p.image_link}
                        alt={p.title}
                        width={70}
                        style={{ borderRadius: "4px" }}
                      />
                    ) : (
                      "Sin imagen"
                    )}
                  </td>
                  <td style={{ display: "flex", gap: "0.25rem" }}>
                    <button onClick={() => handleEdit(p)}>✏️ Editar</button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      style={{ backgroundColor: "#f55", color: "#fff" }}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀️ Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Siguiente ▶️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminInventory;
