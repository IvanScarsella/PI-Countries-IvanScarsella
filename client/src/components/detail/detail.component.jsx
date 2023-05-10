import useCountry from '../../hooks/useCountry';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryDetail, clearDetail } from '../../redux/actions/actions';
import './detail.styles.css';

function Detail() {

    const { id } = useParams()
    const dispatch = useDispatch()

    const country = useCountry(state => state.countryDetail);

    const { name, flag, continent, capital, subregion, area, population } = country;

    useEffect(() => {
        dispatch(getCountryDetail(id))

        return dispatch(clearDetail())
    }, [dispatch, id])

    return (
        <>
            <div>
                <div>
                    <Link to={'/home'}>
                        <button className='detailButton'>Menú Principal</button>
                    </Link>
                </div>

                {country.flag ?
                    <div className='Detail'>
                        <div>
                            <div />
                            <img src={(country?.flag.match(/\.(jpeg|jpg|gif|png)$/) || !country.flag) ? country?.flag : "https://img.freepik.com/fotos-premium/solo-fondo-negro-joystick-3d-rendering_1379-4875.jpg"} alt="country flag" />
                            <div>
                                <h1 className='countryName'>{country.name}</h1>
                                <p className='details'><b>Continent:</b>{country?.continent}</p>
                                <p className='details'><b>Capital:</b>{country?.capital}</p>
                                <p className='details'><b>Subregion:</b>{country?.subregion}</p>
                                <p className='details'><b>Area:</b>{country?.area}</p>
                                <p className='details'><b>Population:</b>{country?.population}</p>
                            </div>
                        </div>
                    </div>
                    : <h3>Cargando...</h3>}
                    </div>
        </>
    );
}