import axios from "axios";
import { DELETE_PROJECT, GET_ERRORS, GET_PROJECT, GET_PROJECTS } from "./types";

export const createProject = (project, navigate) => async dispatch => {
    try {
        await axios.post('/api/project', project);
        navigate('/dashboard');
    } catch (err) {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    };
};


export const getProjects = () => async dispatch => {
    try {
        const res = await axios.get('/api/project/all');

        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    };
};


export const getProject = (id, navigate) => async dispatch => {
    try {
        const res = await axios.get(`/api/project/${id}`);

        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
    } catch (err) {
        navigate('../dashboard');
    }
    
};


export const deleteProject = id => async dispatch => {
    try {
        if(window.confirm("Are you sure? This will delete the project and all data related.")){
            await axios.delete(`/api/project/${id}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: id
            });
        }
        
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};