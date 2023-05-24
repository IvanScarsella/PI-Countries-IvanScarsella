import { useSelector } from "react-redux";
import Card from "../card/card.component";
import './cards.styles.css';

function Cards({ allCountries }) {
    const { page } = useSelector(state => state)

    const countriesList = allCountries.slice((page - 1) * 10, page * 10) // los 10 países que se muestran en cada página

    return (
        <div className="card-list">
            {countriesList?.map((country) => (
                <Card country={country} key={country.id} />
            ))}
        </div>
    );
}

export default Cards;