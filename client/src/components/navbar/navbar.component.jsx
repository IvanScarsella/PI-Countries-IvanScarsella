import './navbar.styles.css';
import FilterBy from '../filter/filter.component';

function Navbar({ handleSubmit }) {
    return (
        <div className="search-box">
            <h1 className="navbarTitle">Escriba el nombre del país que está buscando</h1>
            <form onChange={handleSubmit}>
                <input placeholder='Búsqueda' type="search" id='busqueda' />
                <button type='submit'
                onClick={handleSubmit}
                >Buscar</button>
                {/* <FilterBy>

                </FilterBy> */}
            </form>
        </div>
    );
}

export default Navbar;