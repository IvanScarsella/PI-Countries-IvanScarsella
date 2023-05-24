import { Link } from "react-router-dom";
import "../landing/landing.styles.css";

export default function Landing() {
    return (
        <div className="landingContainer">
            <div>
                <h1>Bienvenido al Proyecto Individual: Countries</h1>
                <h2>Creado por Iván Scarsella para <a href="https://www.soyhenry.com/" target="_blank" rel="noopener noreferrer"><b className="henry">Henry</b></a></h2>
                <button className="henryButton">
                    <a href="https://www.soyhenry.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.soyhenry.com/_next/image?url=https%3A%2F%2Fassets.soyhenry.com%2Fhenry-landing%2Fassets%2FHenry%2Flogo-white.png&w=128&q=75" alt="henry-logo"/></a>
                </button>
            </div>

            <div className="buttons">
                <Link to="/home"> 
                    <button className="landingButton">Click aquí para acceder a la página principal</button>
                </Link>
                <Link to="/create">
                    <button className="landingButton">Click aquí para crear una actividad</button>
                </Link>
                <Link to="/activities">
                    <button className="landingButton">Click aquí para ver todas las actividades</button>
                </Link>
            </div>
        </div>
    )
}