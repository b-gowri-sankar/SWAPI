import React from 'react';
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

const fetchPeople = async (key) => {
    const res = await fetch(`${key.queryKey[1]}`)
    return res.json()
}



const User = (props) => {
    const { data, status } = useQuery(['People', props.location.aboutProps.url], fetchPeople);

    if (status === 'loading') {
        return <div>Loading Data</div>
    }
    
    console.log(data)
    return (
        <>
            <div className='star_wars_card'>
                <h2>{data.name}</h2>
                <div>
                    <p>Skin Color: {data.skin_color}</p>
                    <p>Weight: {data.mass}</p>
                    <p>Height: {data.height}</p>
                    <p>Eye Color: {data.eye_color}</p>
                </div>
            </div>
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

export default hof(User)
