import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createActivity, changePage, getCountries, getActivities } from "../../redux/actions/actions";
import "../create/create.styles.css";

function Create() {
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: [],
    })

    const [error, setError] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: ""
    })

    const { pages, allCountries } = useSelector(state => state)

    const dispatch = useDispatch();

    const allActivities = useSelector((state) => state.allActivities);

    const activitiesString = [];
    allActivities.forEach(activity => {
        activitiesString.push(activity.name.toLowerCase())
    });

    const validate = (input) => { // validaciones del form
        let error = {}
        const regexName = new RegExp('^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$', 'i');
        if (!input.name) {
            error.name = "Inserte un nombre"
        } if (input.name && input.name.length > 40) {
            error.name = "El nombre debe tener menos de 40 caracteres"
        } if (input.name && !regexName.test(input.name)) {
            error.name = "el nombre debe contener solo letras"
        } if (activitiesString.includes(input.name.toLowerCase())) {
            error.name = "Ya existe una actividad con este nombre"
        } if (!input.difficulty || input.difficulty < 1 || input.difficulty > 5 || isNaN(input.difficulty)) {
            error.difficulty = "La dificultad debe ser un número entre 1 y 5"
        } if (!input.duration || input.duration < 1 || input.duration > 12 || isNaN(input.duration)) {
            error.duration = "La duración debe estar entre 1 y 12 horas"
        } if (!input.season) {
            error.season = "Seleccione una estación del año"
        } if (input.country.length === 0) {
            error.country = "Seleccione al menos un país"
        }
        return error
    }

    const seasons = [
        { name: "Summer", index: 1 },
        { name: "Autumn", index: 2 },
        { name: "Winter", index: 3 },
        { name: "Spring", index: 4 }
    ]

    function handleChangeInput(e) { // función para cambiar los inputs del form
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    // const handleChangeSeason = (e) => { // función que contorla las estaciones del año del form
    //     const { season } = input
    //     if (e.target.value !== "Seleccione al menos una opción") {
    //         const find = season.find(f => f === e.target.value)
    //         if (!find) {
    //             setInput({
    //                 ...input,
    //                 season: [...input.season, e.target.value]
    //             })
    //             setError(validate({
    //                 ...input,
    //                 [e.target.name]: e.target.value
    //             }))
    //         }
    //     }
    // }

    const handleChangeCountry = (e) => { // función que controla los países del form
        const { country } = input
        if (e.target.value !== "Seleccione al menos una opción") {
            const find = country.find(f => f === e.target.value)
            if (!find) {
                setInput({
                    ...input,
                    country: [...input.country, e.target.value]
                })
                setError(validate({
                    ...input,
                    [e.target.name]: e.target.value
                }))
            }
        }
    }

    const handleSubmitForm = (e) => {
        dispatch(createActivity(input));
        alert("Has creado una actividad con éxito")
        dispatch(changePage(pages))
    }

    function deleteSelectedValue(property, value) { // elimina el país seleccionado
        const filter = input[property].filter(p => p !== value)
        setInput({
            ...input,
            [property]: filter
        })
        if (filter.length === 0) {
            setError(validate({
                ...input,
                [property]: []
            }))
        }
    }

    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActivities())
    }, [dispatch])

    return (
        <div className="Create">
            <Link to='/landing'>
                <button className='backToLanding'>Volver a la landing Page</button>
            </Link>
            <form className='createForm' onSubmit={handleSubmitForm}>
                <div>
                    <label>Nombre</label>
                    <input type='text' name='name' value={input.name} onChange={handleChangeInput} />
                    {error.name && <label className='errorLabel'>{error.name}</label>}
                </div>

                <div>
                    <label>Dificultad</label>
                    <input type='text' name='difficulty' value={input.difficulty} onChange={handleChangeInput} />
                    {error.difficulty && <label className='errorLabel'>{error.difficulty}</label>}
                </div>

                <div>
                    <label>Duración(en horas)</label>
                    <input type='text' name='duration' value={input.duration} onChange={handleChangeInput} />
                    {error.duration && <label className='errorLabel'>{error.duration}</label>}
                </div>

                <label htmlFor="season">Estación</label>
                <select name="season" value={input.season.length === 0 ? "" : input.season[input.season.length - 1]}
                    onChange={handleChangeInput}>
                    {input.season ? <option selected>Seleccionada: {input.season}</option> : <option>Seleccione una estación del año</option>}
                    {seasons?.map((season => {
                        return <option name={season?.name} key={season?.name} value={season?.name}>{season?.name}</option>
                    }))}
                </select>
                {error.season ? <label className='errorLabel'>{error.season}</label>
                    : null
                }

                <label htmlFor="country" >País</label>
                <select name="country" value={input.country.length === 0 ? "" : input.country[input.country.length - 1]}
                    onChange={handleChangeCountry}>
                    <option>Seleccione al menos una opción</option>
                    {allCountries?.sort((a, b) => a?.name.localeCompare(b?.name)).map((country) => {
                        return <option name={country?.name} key={country?.name} value={country?.name}>{country?.name}</option>
                    })}
                </select>
                {error.country ? <label className='errorLabel'>{error.country}</label>
                    : <div >
                        {input.country.sort((a, b) => a.localeCompare(b)).map((d, index) => {
                            if (d !== 'Seleccione al menos una opción') {
                                return (<>
                                    <button className='deleteButton' key={index} type="button" onClick={() => deleteSelectedValue("country", d)}>X</button>
                                    <label>{d}
                                        {index === input?.country.length - 1 ? "" : ","}</label> {/* separo por coma, menos al final */}
                                </>)
                            }
                            return null
                        })}
                    </div>}

                {error.name || error.difficulty || error.duration || error.season || error.country || !input.name ? null
                    : <button type='submit'>Submit</button>}
            </form>
        </div>
    )
}

export default Create;