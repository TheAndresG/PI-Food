import "./css/inicio.css"
import './App.css';
import { Link } from 'react-router-dom';
//import Prueba from './components/Prueba.js';





function App() {
  return (

    <div className="App">
      <div className="Contenedor">
        <h1 className='titulo'> Pagina de Inicio </h1>
        <Link className="botons" to="/home"> Home</Link>
        {/* <form>
            <input type="text" placeholder='Tu Nombre' />
        </form> */}
      </div>
    </div>
  );
}

export default App;
