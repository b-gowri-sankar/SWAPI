import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
// import Search from './Search';
import CardLoad from './CardLoad';

// const fetchPeoples = async (key, page) => {
//     const res = await fetch(`http https://swapi.dev/api/people/?page=${page}`);
//     return res.json();
// }
const queryClient = new QueryClient();
const fetchPeoples = async (key) => {
    // console.log(page)
    // console.log('it is executing how many times')
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
    // const [showData, setShowData] = React.useState({
    //     people: true,
    //     filter: false,
    // })
    //consol.log data will display result, next
    //console.log(data.data.next) display next value
    //console.log(data.data.results) wil be array of people
    // console.log(data,'this is resutls and next')

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
    // Its job is to return a react component warpping the baby component
    return (props) => (
        <QueryClientProvider client={queryClient}>
            <WrappedComponent {...props} />
        </QueryClientProvider>
    );
};

export default hof(UserList)
