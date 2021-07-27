import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import CardLoad from './CardLoad';


const queryClient = new QueryClient();
const fetchPeoples = async (key) => {
    
    const res = await fetch(`${key.queryKey[1]}`);
    return res.json();
  }
  


const UserList = () => {
    const [count, setCount] = React.useState(1);
    const url = 'https://swapi.dev/api/people/?search=';
    const [placeholder, setPlaceholder] = React.useState('')
    const [search, setSearch] = React.useState('')
    const [page, setPages] = React.useState(url);
    let Data = {
        results:[]
    }
    const { data, status }= useQuery(['planets', page+search], fetchPeoples, {
        keepPreviousData: true,
    });
    
    Data = {...Data, ...data}

    if (status === 'loading') {
        return <div>Loading Data</div>
    }
    return (
        <>
            <div className='search'>
                <img src="./Images/search.svg" alt='search icon' />
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setPages(url)
                    setCount(1)
                    setSearch(placeholder)
                }}>
                    <input type='text' value={placeholder} id='search' placeholder='Search Task'
                        onChange={(e) => {
                            setPlaceholder(`${e.target.value}`)
                    }} />
                </form>
            </div>
            <CardLoad Data={Data} setPages={setPages} status={status} setSearch={setSearch} count={count} setCount={ setCount }/>
        </>
    )
}
const hof = (WrappedComponent) => {
    return (props) => (
        <QueryClientProvider client={queryClient}>
            <WrappedComponent {...props} />
        </QueryClientProvider>
    );
};

export default hof(UserList)
