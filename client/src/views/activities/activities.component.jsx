import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import Navigate from '../../components/navigate/navigate';
import './activities.styles.css';

function Activities() {
    const dispatch = useDispatch()

    const allActivities = useSelector((state) => state.allActivities);

    let [actividadesOrdenadas,/*  setActividadesOrdenadas */] = useState(allActivities);

    let [orden, setOrden] = useState("A-Z")

    function handleChangeOrder(e) {
        setOrden(e.target.value)
    }

    if (orden === "A-Z") actividadesOrdenadas = allActivities?.sort((a, b) => a.name.localeCompare(b.name)); // ordeno las actividades según el estado local 'orden'
    if (orden === "Z-A") actividadesOrdenadas = allActivities?.sort((a, b) => b.name.localeCompare(a.name));
    if (orden === "Dificultad: menor a mayor") actividadesOrdenadas = allActivities?.sort((a, b) => a.difficulty - b.difficulty);
    if (orden === "Dificultad: mayor a menor") actividadesOrdenadas = allActivities?.sort((a, b) => b.difficulty - a.difficulty);
    if (orden === "Duración: menor a mayor") actividadesOrdenadas = allActivities?.sort((a, b) => a.duration - b.duration);
    if (orden === "Duración: mayor a menor") actividadesOrdenadas = allActivities?.sort((a, b) => b.duration - a.duration);


    useEffect(() => {
        if (!allActivities) {
            dispatch(getActivities())
        }
        dispatch(getActivities())
    }, [dispatch])

    return (
        <>
            <div>
                    <Navigate/>
                <h1>Listado de actividades</h1>
                <select name="order" onChange={handleChangeOrder} id='order'>
                    <option value="" defaultValue>Orden</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="Dificultad: menor a mayor">Dificultad: menor a mayor</option>
                    <option value="Dificultad: mayor a menor">Dificultad: mayor a menor</option>
                    <option value="Duración: menor a mayor">Duración: menor a mayor</option>
                    <option value="Duración: mayor a menor">Duración: mayor a menor</option>
                </select>

                {
                    actividadesOrdenadas?.map((activity) => (
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
        </>
    );
}

export default Activities;