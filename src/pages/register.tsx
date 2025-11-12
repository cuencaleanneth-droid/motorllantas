import { useState } from "react";
import { registerUser } from "../services/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await registerUser(form);
    console.log(res);
    alert(res.message);
  };

  return (
    <div>
      <h2>Registro</h2>
      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button onClick={handleSubmit}>Registrar</button>
    </div>
  );
};

export default Register;
