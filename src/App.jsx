import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Layout from './pages/LayoutPage'

// Pages
import QuizesPage from './pages/QuizesPage'
import FísicaPage from './pages/FísicaPage'
import MatemáticaPage from './pages/MatemáticaPage'
import CientistasPage from './pages/CientistasPage'
import SobrePage from './pages/SobrePage'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/quizzes' element={<QuizesPage />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/sobre' element={<SobrePage />}/>
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
