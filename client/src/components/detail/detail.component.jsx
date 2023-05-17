import useCountry from '../../hooks/useCountry';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryDetail, clearDetail, getCountries } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import './detail.styles.css';

function Detail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    
    const allCountries = useSelector((state) => state.allCountries);
    // if(!allCountries) = 

    const country = useCountry(state => state.countryDetail);

    
    
    const { name, flag, continent, capital, subregion, area, population } = country;
    useEffect(() => {
        if (!allCountries){
            dispatch(getCountries())
        }
        dispatch(getCountryDetail(id))

        return dispatch(clearDetail())
    }, [dispatch, id])
    console.log(country.flag);

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
                            <img src={(country?.flag?.match(/\.(jpeg|jpg|gif|png|svg)$/) || !country.flag) ? country?.flag : "https://img.freepik.com/vector-premium/globo-terraqueo-3d-ilustracion-vector-latitud-longitud_599851-239.jpg?w=2000"} alt="country flag" />
                            <div>
                                <h1 className='countryName'>{country.name}</h1>
                                <p className='details'><b>Id: </b>{country?.id}</p>
                                <p className='details'><b>Continente: </b>{country?.continent}</p>
                                <p className='details'><b>Subregión: </b>{country?.subregion}</p>
                                <p className='details'><b>Capital: </b>{country?.capital}</p>
                                <p className='details'><b>Superficie: </b>{country?.area} km²</p>
                                <p className='details'><b>Población: </b>{country?.population}</p>
                            </div>
                        </div>
                    </div>
                    : <h3>Cargando...</h3>}
                    </div>
        </>
    );
}

export default Detail;