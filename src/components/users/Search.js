import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext';




const Search =()=> {

    const githubContext = useContext(GithubContext);

    const [text, settext] = useState('');
    const [error, seterror] = useState(false);
    

    const resetState =()=>{
        seterror(false);
    }

     const onChange=(e)=>{
        settext(e.target.value);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(text === ''){
            seterror(true);
            setTimeout(resetState, 5000)
        }else{
        githubContext.searchUsers(text);
        settext('');
        }

    }
    
        return (
            <div>
                {error && <div className='alert alert-light'><i className='fas fa-info-circle'></i> Please Enter a Text</div>}
                <form onSubmit={onSubmit}>
                    <input type='text' name='text' placeholder='Search Github Users...' value={text} onChange={onChange}/>
                    <input type='submit' value='Search' className='btn btn-primary btn-block'/>
                </form>
                {(githubContext.users.length > 0) && <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>Clear</button>}
            </div>
        )
    

    
}




export default Search
