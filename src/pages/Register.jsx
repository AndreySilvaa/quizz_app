import React, { useState } from "react";
import "../styles/register.css";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false)

  async function registerUser(e) {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({name, password}),
        headers: {'Content-Type':'application/json'}
    })

    if(response.status !== 200){
      alert("Registro de usuário falhou!")
    }else{
      alert("Usuário registrado com sucesso!")
      setRedirect(true)
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className="register" >
      <h1>Crie sua conta!</h1>

      <form className="registerForm" onSubmit={(e) => registerUser(e)}>
        <input
          type="text"
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Criar</button>
      </form>
    </div>
  );
};

export default Register;
