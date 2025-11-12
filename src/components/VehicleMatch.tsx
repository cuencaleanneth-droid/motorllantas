import React, { useState } from "react";
//@ts-ignore
import vehicleData from "../data/vehicleData";

const API_URL = import.meta.env.VITE_API_URL;

const VehicleMatch: React.FC = () => {
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [results, setResults] = useState([]);

  const brands = Object.keys(vehicleData);
  const years = brand ? Object.keys(vehicleData[brand]) : [];
  const models = brand && year ? Object.keys(vehicleData[brand][year]) : [];

  const handleSearch = async () => {
    if (!brand || !year || !model) {
      alert("Selecciona marca, año y modelo");
      return;
    }

    const sizes = vehicleData[brand][year][model];
    if (!sizes || sizes.length === 0) {
      alert("No hay medidas registradas para este modelo");
      return;
    }

    try {
      const query = sizes.join(",");
      const response = await fetch(`${API_URL}/inventory?tires=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error al buscar llantas:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Encuentra tus llantas por vehículo</h2>

      <div>
        <label>Marca:</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Selecciona</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Año:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)} disabled={!brand}>
          <option value="">Selecciona</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Modelo:</label>
        <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!year}>
          <option value="">Selecciona</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSearch}>Buscar Llantas</button>

      <div style={{ marginTop: "20px" }}>
        <h3>Resultados:</h3>
        {results.length === 0 ? (
          <p>No se encontraron llantas compatibles.</p>
        ) : (
          <ul>
            {results.map((tire: any) => (
              <li key={tire.id}>
                <strong>{tire.name}</strong> - {tire.model} ({tire.size})  
                <br />
                Marca: {tire.brand} | Precio: ${tire.regular_price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VehicleMatch;
