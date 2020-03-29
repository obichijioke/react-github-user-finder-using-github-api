import React, {Fragment, useEffect, useContext} from 'react'
import Users from './components/users/Users';
import Search from './components/users/Search';
import GithubContext from './context/github/githubContext';

export default function Home() {
    const githubContext = useContext(GithubContext);
  
     useEffect(() => {
      githubContext.fetchData();
      //eslint-disable-next-line
  }, []);

    return (
        <Fragment>
        <Search/>
        <Users />
        </Fragment>
    )
}
