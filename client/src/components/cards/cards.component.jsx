import { useSelector } from "react-redux";
import Card from "../card/card.component";
import './cards.styles.css';

function Cards({ allCountries }) {
    const { page } = useSelector(state => state)

    const countriesList = allCountries.slice((page - 1) * 10, page * 10)

    return (
        <div className="card-list">
            {countriesList?.map((country) => (
                <Card country={country} key={country.id} />
            ))}
        </div>
    );
}

export default Cards;