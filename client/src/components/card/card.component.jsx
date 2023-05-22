import { Link } from 'react-router-dom';
import './card.styles.css';

function Card({ country }) {
    const { id, name, flag, continent, capital, subregion, area, population } = country;

    return (
        <div className="card-conteiner">
            <Link to={`/detail/${id}`}>
                <img className='flag' src={flag} alt="country flag" />
                <h2 className='name'>{name}</h2>
                <p className='continent'>{continent}</p>
                <p className='population'>{population}</p>
            </Link>
        </div>
    );
}

export default Card;