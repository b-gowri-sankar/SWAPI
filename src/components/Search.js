import React from 'react'
import{useQuery} from 'react-query'
import CardLoad from './CardLoad';

const fetchSearch = async (key) => {
    console.log('this is querykey',key.queryKey[1])

    const res = await fetch(`${key.queryKey[1]}`)

    return res.json();
}

const Search = (props) => {

    const [search, setSearch] = React.useState('')

    let Data = {
        results:[]
    }
    
    let default_url = 'https://swapi.dev/api/people/?search=';

    const { data, status, refetch } = useQuery(['FindPeople', default_url + search], fetchSearch, {
        enabled: false
    })


    const { setShowData, showData } = props;
    if (status === 'loading') {
        return <div>Loading Data</div>
    }


    Data = {...Data, ...data}
    console.log('this is search data', Data)
    // props.setData({...data})
    return (
        <>
            <div className='search'>
                <img src="./Images/search.svg" alt='search icon' />
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setShowData({
                        ...showData,
                        filter: true,
                        people: false
                    })
                    refetch();
                }}>
                    <input type='text' value={search} id='search' placeholder='Search Task'
                        onChange={(e) => {
                            default_url = '';
                            setSearch(`${e.target.value}`)
                    }} />
                </form>
            </div>
            {showData.filter && <CardLoad Data={Data} setPages={setSearch} status={status} refetch={ refetch }/>}
    </>
    )
}

export default Search
