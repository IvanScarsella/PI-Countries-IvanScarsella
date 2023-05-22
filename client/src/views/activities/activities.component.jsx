import useCountry from '../../hooks/useCountry';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryDetail, clearDetail, getCountries, getActivities } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import './activities.styles.css';

function Activities() {
    const dispatch = useDispatch()

    const allActivities = useSelector((state) => state.allActivities);

    let [actividadesOrdenadas, setActividadesOrdenadas] = useState(allActivities);

    function handleChangeOrder(e) {
        let orden = [];
        switch (e.target.value) {
            case "A-Z": orden = allActivities.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A": orden = allActivities.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default: orden = allActivities.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        setActividadesOrdenadas(orden)
    }

    useEffect(() => {
        if (!allActivities) {
            dispatch(getActivities())
        }
        dispatch(getActivities())
    }, [dispatch])

    return (
        <>
            <div>
                <div>
                    <Link to={'/landing'}>
                        <button className='activitiesButton'>Volver a la landing page</button>
                    </Link>
                </div>
                <h1>Listado de actividades</h1>
                <select name="order" onChange={handleChangeOrder} id='order'>
                    <option value="" defaultValue>Orden</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>

                {
                    actividadesOrdenadas ?
                        actividadesOrdenadas?.map((activity) => (
                            <>
                                <h2 className='activityName'>{activity.name}</h2>
                                <p>Dificultad: {activity.difficulty}</p>
                                <p>Duración: {activity.duration}</p>
                                <p>Estación del año: {activity.season}</p>
                                <p>Países: {activity.country.join(", ")}</p>
                            </>
                        ))
                        :
                        allActivities?.map((activity) => (
                            <>
                                <h2 className='activityName'>{activity.name}</h2>
                                <p>Dificultad: {activity.difficulty}</p>
                                <p>Duración: {activity.duration}</p>
                                <p>Estación del año: {activity.season}</p>
                                <p>Países: {activity.country.join(", ")}</p>
                            </>
                        ))
                }
            </div>
            {/* </div> */}

        </>
    );
}

export default Activities;