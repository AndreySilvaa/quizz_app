import React from 'react'
import '../styles/header.css'
import { GiAtom } from "react-icons/gi";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <nav>
            <div className='logo'>
                <span><GiAtom /></span>
                <NavLink to={'/'} className='logo'>Lumia</NavLink>
            </div>

            <div className='links'>
                <NavLink to={'/quizzes'}>Quizes</NavLink>
                <NavLink to={'/login'}>Entrar</NavLink>
                <NavLink to={'/register'}>Criar Conta</NavLink>
                <NavLink to={'/sobre'}>Sobre</NavLink>
            </div>
        </nav>
    </header>
  )
}

export default Header