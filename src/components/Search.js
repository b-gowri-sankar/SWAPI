import React from 'react'
import{useQuery} from 'react-query'

const fetchSearch = async (key) => {
    const res = await fetch(`${key.queryKey[1]}`)

    return res.json();
}

const Search = (props) => {

    const [search, setSearch] = React.useState('')

    const { data, status, refetch } = useQuery(['FindPeople', search], fetchSearch, {
        enabled: false
    })

    console.log('this is search data', data)
    if (status === 'loading') {
        return <div>Loading Data</div>
    }

    // props.setData({...data})
    return (
        <>
            <div className='search'>
                <img src="./Images/search.svg" alt='search icon' />
                <form onSubmit={(e) => {
                    e.preventDefault();
                    refetch();
                }}>
                    <input type='text' value={search} id='search' placeholder='Search Task' onChange={(e)=> setSearch(`https://swapi.dev/api/people/?search=${e.target.value}`) }/>
                </form>
            </div>
    </>
    )
}

export default Search
