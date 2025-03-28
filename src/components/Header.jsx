import React, { useEffect, useState } from 'react'
import '../styles/header.css'
import { GiAtom } from "react-icons/gi";
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [profileData, setProfileData] = useState(undefined)


  useEffect(() =>{
    
    const fetchData = async () =>{
      try {
        const res = await fetch('http://localhost:4000/profile', {
          method: 'GET',
          credentials: 'include'
        })

        const data = await res.json()
        setProfileData(data)

      } catch (error) {
        console.log('Erro ao carregar informações do usuário: ' + error)
      }
    }
    
    fetchData()
    
  }, [])

  function logout(){
   
    fetch('http://localhost:4000/logout', {
      credentials: 'include'
    })
  }

  return (
    <header>
        <nav>
            <div className='logo'>
                <span><GiAtom /></span>
                <NavLink to={'/'} className='logo'>Lumia</NavLink>
            </div>

            {profileData ? (
              <div className='links'>
                <div>Olá, {profileData.name}</div>
                <NavLink to={'/quizzes'}>Quizes</NavLink>
                <NavLink to={'/sobre'}>Sobre</NavLink>
                <a href="" onClick={logout}>Sair</a>
          </div>
            ) : (
              <div className='links'>
                <NavLink to={'/quizzes'}>Quizes</NavLink>
                <NavLink to={'/login'}>Entrar</NavLink>
                <NavLink to={'/register'}>Criar Conta</NavLink>
                <NavLink to={'/sobre'}>Sobre</NavLink>
            </div>
            )}

            
        </nav>
    </header>
  )
}

export default Header