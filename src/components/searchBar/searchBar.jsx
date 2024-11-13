import './searchBar.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const types = ['buy', 'rent']


function SearchBar() {

    const [search, setSearch] = useState({
        type: 'buy',
        location: '',
        minPrice: 0,
        maxPrice: 0,
    })

    const switchType = (val) => {
        setSearch((prev) => ({ ...prev, type: val }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setSearch((prev) => ({ ...prev, [name]: value }))
    }
    return (
        <div className="searchBar">
            <div className="type">
                {types.map(type => (
                    <button
                        key={type}
                        onClick={() => switchType(type)}
                        className={search.type === type ? 'active' : ''}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <form>
                <input type="text" name='location' placeholder='City Location' onChange={handleChange} />
                <input type="number" name='minPrice' min={0} max={10000000} placeholder='Min Price' onChange={handleChange} />
                <input type="number" name='maxPrice' min={0} max={10000000} placeholder='Max Price' onChange={handleChange} />
                <Link to={`/list?type=${search.type}&city=${search.location}&minPrice=${search.minPrice}&maxPrice=${search.maxPrice}`}>
                    <button>
                        <img src="./search.png" alt="" />
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default SearchBar