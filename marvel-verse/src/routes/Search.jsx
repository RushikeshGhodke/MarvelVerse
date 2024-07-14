import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './Search.css'
import { ImSearch } from 'react-icons/im'
import md5 from 'md5'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import HeroCard from '../components/HeroCard'
import Footer from '../components/Footer'

const Search = () => {

  const [input, setInput] = useState("")
  const [data, setData] = useState(null)

  const handleChange = async (e) => {
    setInput(e);
    console.log(input);

    // https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=Iron Man&apikey=#&ts=1&hash=307fd1df7d2e7767754e5421d8bf2a77
    const ts = new Date().getTime();
    const publicKey = '#';
    const privateKey = '#';
    const hash = md5(ts + privateKey + publicKey);

    if (input.length > 0) {
      const res = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${e}&limit=50&apikey=${publicKey}&ts=${ts}&hash=${hash}`);
      console.log(res.data.data.results);
      setData(res.data.data.results);
    }
  }


  return (
    <>
      <Navbar />
      <div className='search-main'>
        <div className="input-wrapper">
          <ImSearch className="input-icon" size="1.5em" />
          <input type="text" placeholder="SEARCH" onChange={(e) => handleChange(e.target.value)} className="search-bar" />
        </div>
      </div>

      <div className='character-list-container'>
        { data && <h1 className='character-list-heading'>Matched Characters</h1>}
        <div className="character-list">
          {
            data?.map((h, i) => (
              <div key={i} className="link-wrapper">
                <Link to={`/character/${h.id}`} target="_blank">
                  <HeroCard
                    image={`${h.thumbnail.path}.${h.thumbnail.extension}`}
                    name={h.name}
                    description={h.description}
                  />
                </Link>
              </div>
            ))
          }
        </div>
      </div>
      <Footer/>
    </>
  )
  
}

export default Search