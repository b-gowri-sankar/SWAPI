import React from 'react'
import { Link } from 'react-router-dom'

const CardLoad = (props) => {
    const { Data, setPages, status, setSearch, count, setCount } = props;

    if (status === 'loading')
        return null
    return (
        <>
        <div className='cardList'>
                {Data.results.map(people => (
                    <Link to={{
                        pathname: `/user/${people.created}`,
                        aboutProps: {
                            url: people.url
                        }
                    }}
                    className='card' key={people.url}>
                            <div className='left'>
                                <p>{people.name}</p>
                                <p>{ people.gender }</p>
                            </div>
                            <div className='right'>
                                {people.hair_color}
                            </div>
                    </Link>
                    ))}
            </div>
            <div className='pages'>
                {Data.previous == null ? null : <button
                    onClick={() => {
                        setSearch('')
                        setPages(Data.previous);
                        setCount(count - 1);
                }}>Previous</button>}
                    <h1>{count}</h1>
                {Data.next == null ? null : <button
                    onClick={
                        () => {
                            setSearch('')
                            setPages(Data.next);
                            setCount(count + 1);
                        }
                    }>Next</button>}
            </div>
    </>
    )
}

export default CardLoad
