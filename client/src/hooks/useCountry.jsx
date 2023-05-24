import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryDetail } from "../redux/actions/actions";

const useCountry = () => {
    const dispatch = useDispatch();
    const countryDetail = useSelector((state) => state.countryDetail);
    const { detailId } = useParams();

    useEffect(() => {
        dispatch(getCountryDetail(detailId));
    }, [dispatch, detailId])

    return countryDetail
}

export default useCountry;