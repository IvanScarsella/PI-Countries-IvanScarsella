import { Link } from 'react-router-dom';
import './card.styles.css';

function Card({ country }) {
    const { id, name, flag, continent, capital, subregion, area, population } = country;

    const imagenFondo = {
        'background-image': `linear-gradient(#ffffff3f,
            #ffffff5f), url(${(flag)})`,
            'background-size': 'cover',
            'background-position':'center',
    }

    return (
        <>
        <div className="card-conteiner" style={imagenFondo}>
            <Link to={`/detail/${id}`}>
                <img className='flag' src={flag} alt="country flag" />
                <h2 className='name' >{name}</h2>
                <p className='continent'>{continent}</p>
                <p className='population'>{population}</p>
            </Link>
        </div>
        </>
    );
}

export default Card;