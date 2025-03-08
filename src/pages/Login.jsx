import React, { useState } from 'react'
import '../styles/login.css'
import { Navigate } from 'react-router-dom'

const Login = () => {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  async function login(e){
    e.preventDefault()

    const response = await fetch('http://localhost:4000/login', {
      method: "POST",
      body: JSON.stringify({name, password}),
      headers: {"Content-Type":"application/json"},
      credentials: "include"
    })

    if(response.status !== 200){
      alert('Login inválido')
    }else{
      setRedirect(true)
    }
  }

  if(redirect){
    return <Navigate to={"/"}/>
  }

  return (
    <div className="login" >
      <h1>Entre na sua conta!</h1>

      <form className="loginForm" onSubmit={(e) => login(e)}>
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

        <button>Entrar</button>
      </form>
    </div>
  )
}

export default Login