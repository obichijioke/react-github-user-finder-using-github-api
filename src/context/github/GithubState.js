import React, {useReducer} from 'react';
import axios from 'axios'
import githubContext from './githubContext';
import GithubReducer from './githubReducer';
import {SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS, FETCH_DATA} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [], 
        loading: false

    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //Search Users
    const searchUsers = async (text) =>{
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type:SEARCH_USERS,
            payload: res.data.items
        })
      }

    //Get User
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_USER,
            payload: res.data});
      }
    //fetch users
      const fetchData = async () => {
          setLoading();
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
          dispatch({
            type: FETCH_DATA,
            payload: res.data});
          
      }

    //Get Repos
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data});
      }

    //Clear Users
    const clearUsers = () => {
        dispatch({type: CLEAR_USERS, payload:[]});
      }

    //Set Loading
    const setLoading = () => dispatch({type:SET_LOADING});



    return <githubContext.Provider 
                value={{
                    users: state.users,
                    user: state.user,
                    repos: state.repos,
                    loading: state.loading,
                    searchUsers,
                    clearUsers,
                    getUser,
                    getUserRepos,
                    fetchData
                }}>
                {props.children}
            </githubContext.Provider>

}

export default GithubState;