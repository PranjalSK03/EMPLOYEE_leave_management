import {  Routes , Route} from 'react-router-dom'
// import './App.css'
import axios from 'axios'
import Home from './Home.js' 
import Login from './Login.js'
import Register from './Register.js'
import Dashboard from './Dashboard.js'
axios.defaults.baseURL = 'http://localhost:4000'

function App() {
  
  return (
      <Routes>
          <Route exact path="/" element = { <Home /> } />
          <Route path="/login" element = { < Login /> } /> 
          <Route path="/register" element = { < Register /> } /> 
          <Route path ="/dashboard" element = { <Dashboard />} />
      </Routes>
  )
}

export default App