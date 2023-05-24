import { Link } from "react-router-dom";
import "../navigate/navigate.styles.css";

function Navigate() {
    return (
        <div className="navigateContainer">
            <Link to='/landing'>
                <button className='navigateButton'>Volver a la landing Page</button>
            </Link>
            <Link to="/home">
                <button className="navigateButton">Click aquí para acceder a la página principal</button>
            </Link>
            <Link to="/create">
                <button className="navigateButton">Click aquí para crear una actividad</button>
            </Link>
            <Link to="/activities">
                <button className="navigateButton">Click aquí para ver todas las actividades</button>
            </Link>
        </div>
    )
}

export default Navigate;