import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import Search from './Search';
import CardLoad from './CardLoad';

// const fetchPeoples = async (key, page) => {
//     const res = await fetch(`http https://swapi.dev/api/people/?page=${page}`);
//     return res.json();
// }
const queryClient = new QueryClient();
const fetchPeoples = async (key) => {
    // console.log(page)
    console.log('it is executing how many times')
    const res = await fetch(`${key.queryKey[1]}`);
    return res.json();
  }
  


const UserList = () => {
    const url='http://swapi.dev/api/people/?page=1'
    const [page, setPages] = React.useState(url);
    const { data, status }= useQuery(['planets', page], fetchPeoples, {
        keepPreviousData: true,
    });
    
    
    //consol.log data will display result, next
    //console.log(data.data.next) display next value
    //console.log(data.data.results) wil be array of people
    // console.log(data,'this is resutls and next')

    if (status === 'loading') {
        return <div>Loading Data</div>
    }
    return (
        <>
            <Search />
            <CardLoad Data={data} setPages={ setPages }/>
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
