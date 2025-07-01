import { Link } from "react-router-dom";
import '../Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-title">App Matemática</div>
            <div className="navbar-links">
                <Link to="/">Inicio</Link>
                <Link to="/calculos">Cálculos estadísticos</Link>
                <Link to="/ecuaciones">Resolución de ecuaciones</Link>
                <Link to="/inventario">Gestión de inventario</Link>
                <Link to="/informacion">Datos Informativos</Link>
            </div>
        </div>

    );
};

export default Navbar;
