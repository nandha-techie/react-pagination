import { useEffect, useState } from 'react';
import '../styles/pagination.css';

const Pagination = ()=>{
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPages, setPerPages] = useState(5);
    const url = 'https://dummyjson.com/quotes';

    const totalPages = Math.ceil((users.length / perPages));
    const pages = [...Array(totalPages + 1).keys()].slice(1);
    const lastIndex = currentPage * perPages;
    const firstIndex = lastIndex - perPages;
    const displayUsers = users.slice(firstIndex, lastIndex);
    

    const handlePage = (pageNo)=>{
        setCurrentPage(pageNo);
    }
    const prevPage = ()=>{
        setCurrentPage(num => num !== 1 ? num - 1 : num);
    }
    const nextPage = ()=>{
        setCurrentPage(num =>  num !== totalPages ? num + 1 : num);
    }

    const getData = async ()=>{
        const res = await fetch(url); 
        const data = await res.json();
        setUsers(data.quotes);
    }

    useEffect(()=>{
        getData();
    }, []);

    return(
        <div className='container'>
            <div>
                <div>
                    <h1>React Pagination</h1>
                </div>    
                <div className="perpage">
                    <select onChange={(e) => setPerPages(e.target.value)}>
                        <option value="5">Select Per Page</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayUsers.map((user, key) =>(
                                <tr key={key}>
                                    <td>{user.id}</td>
                                    <td>{ user.author }</td>
                                    <td>{ user.quote }</td>
                                </tr>
                            ))
                        }
                    </tbody>    
                </table>
                <div className='page-navigate'>
                    <button onClick={() => prevPage()} disabled={ currentPage === 1 } >Prev</button>
                    <ul className='pager'>
                        {   pages.map((pages, key)=>(
                                <li key={key} className={ (currentPage === key + 1 ? 'active': '')} onClick={() => handlePage(key + 1)}>{ key + 1 }</li>
                            ))
                        }
                    </ul>
                    <button onClick={() => nextPage()} disabled={ currentPage === totalPages }>Next</button>
                </div>
            </div>
        </div>
    )
}
export default Pagination;