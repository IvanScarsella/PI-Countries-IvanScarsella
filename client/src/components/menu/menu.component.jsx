import "../menu/menu.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { increasePage, decreasePage, changePage, getCurrentPages } from "../../redux/actions/actions";
import { useEffect, useState } from "react";

export default function Menu() {
    const [arrPages, setArrPages] = useState([]);
    const dispatch = useDispatch();

    const { page, pages, allCountries } = useSelector(state => state)

    useEffect(() => {
        getCurrentPages(allCountries)
        let arr = []
        for (let i = 1; i <= pages; i++) {
            arr.push(i)
        }
        setArrPages(arr)
    }, [pages])

    const changePageFunct = (p) => {
        dispatch(changePage(Number(p)))
        console.log(p);
    }

    const paginaActual = {
        'background-color': '#9fbabd',
        'font-size': '1.5em',
        'padding': '3px 3px',
        'height': 'auto'
    };

    return (
        <>
            <p>Páginas</p>
            <p>actual: {page}</p>
            <div className='div_menu'>
                {page !== 1 && <button onClick={() => dispatch(decreasePage())}>anterior</button>}
                {
                    arrPages.map((p, index) => {
                        if(p === page){

                            return <button key={p}
                            style={paginaActual}
                            className='button'
                            onClick={() => changePageFunct(p)}>{p}</button>
                        } else {
                            return <button key={p}
                            className='button'
                            onClick={() => changePageFunct(p)}>{p}</button>

                        }
                    })
                }
                {page !== pages && <button onClick={() => dispatch(increasePage())}>siguiente</button>}
            </div>
        </>
    )
}