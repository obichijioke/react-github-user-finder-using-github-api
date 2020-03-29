import React, { useEffect, useContext, Fragment } from 'react'
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from './Repos';
import GithubContext from '../../context/github/githubContext'

const User = ({match}) => {
    const gethubContext = useContext(GithubContext);
    const {loading, user, repos, getUser, getUserRepos} = gethubContext;
    
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    }, [])
        
        return (
            <div>
            
            {loading ? <Spinner/> : <div>
                <h1>{user.login}</h1>
            </div>} 
            <Link to='/' className='btn btn-light'>Back to Search</Link>
            Hireable: {''} {user.hireable ? (<i className='fas fa-check text-success'></i>) : (<i className='fas fa-times-circle text-danger'></i>)}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img src={user.avatar_url} className='round-img' alt='' style={{width:'150px'}}/>
                    <h1>{user.name}</h1>
                    <p>Location: {user.location}</p>
                </div>
                <div>
                    {user.bio && (<Fragment>
                        <h3>Bio</h3>
                        <p>{user.bio}</p>
                        </Fragment>)}
                        <a href={user.html_url} className='btn btn-dark my-1'> Visit Github Profile</a>
                        <ul>
                            <li>
                                {user.login && <Fragment>
                                    <strong>Username: </strong> {user.login}
                                    </Fragment>}
                            </li>
                            <li>
                                {user.company && <Fragment>
                                    <strong>Company: </strong> {user.company}
                                    </Fragment>}
                            </li>
                            <li>
                                {user.blog && <Fragment>
                                    <strong>Website: </strong> {user.blog}
                                    </Fragment>}
                            </li>
                        </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-success'>Followers: {user.followers}</div>
                <div className='badge badge-primary'>Following: {user.following}</div>
                <div className='badge badge-light'>Public Repos: {user.public_repos}</div>
                <div className='badge badge-dark'>Public Gist: {user.public_gists}</div>
            </div>
            <Repos repos={repos}/>
            </div>
        )
    
}

export default User
