import { useState } from "react";
import { loginUser } from "../services/api";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await loginUser(form);

    if (res.token) {
      localStorage.setItem("token", res.token);
      alert("Login exitoso");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button onClick={handleSubmit}>Entrar</button>
    </div>
  );
};

export default Login;
