import axios from "axios";
import { GET_ERRORS, LOGOUT, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, navigate) => async dispatch => {
    try {
        await axios.post('/api/users/register', newUser);
        navigate('/login');

        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const login = LoginRequest => async dispatch => {
    try {
        const res = await axios.post('/api/users/login', LoginRequest);
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setJWTToken(token);
        const decoded = jwt_decode(token);

        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);

    dispatch({
        type: LOGOUT,
        payload: {}
    });
}