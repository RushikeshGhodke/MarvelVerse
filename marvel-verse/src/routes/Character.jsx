import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5'
import Navbar from '../components/Navbar.jsx'
import './Character.css'
import Footer from '../components/Footer.jsx';

const Character = () => {
    const { id } = useParams();
    const [characterData, setCharacterData] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSeriesOpen, setIsSeriesOpen] = useState(false);
    const [isStoriesOpen, setIsStoriesOpen] = useState(false);
    const [isEventsOpen, setIsEventsOpen] = useState(false);
    const [isComicsOpen, setIsComicsOpen] = useState(false);

    useEffect(() => {
        fetchCharacterData();
    }, [id])

    const fetchCharacterData = async () => {

        const ts = new Date().getTime();
        const publicKey = '#';
        const privateKey = '#';
        const hash = md5(ts + privateKey + publicKey);

        const url = `http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        try {
            const response = await axios.get(url);
            const data = response.data;
            setCharacterData(data.data.results);

        } catch (error) {
            console.log({ error: 'Error fetching data from Marvel API' });
        }
    }

    return (
        <div>
            <Navbar />
            <h2>Character Details</h2>
            <div>
                {characterData ? (
                    <div className='character-data'>
                        <section className='character-main-info'>
                            <div className='character-id-name-desc'>
                                <p className='character-id'>{id}</p>
                                <h1 className='character-name'>{characterData[0].name}</h1>

                                {
                                    characterData[0].description && <p className='character-desc'>{characterData[0].description}</p>
                                }
                            </div>

                            <div className='character-thumbnail'>
                                {
                                    <img src={`${characterData[0].thumbnail.path}.${characterData[0].thumbnail.extension}`} width={300} height={300} loading='lazy' />
                                }
                            </div>
                        </section>

                        <div className='comics'>
                            {
                                characterData[0]?.comics?.available === 0 ? "" : (
                                    <div>
                                        <h2 className='comics-heading' onClick={() => setIsComicsOpen(!isComicsOpen)}>Comics</h2>
                                        <ul className={`comics-list ${isComicsOpen ? 'open' : ''}`}>
                                            {
                                                characterData[0].comics.items.map((it, i) => (
                                                    <li key={i}>{it.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }

                            {
                                characterData[0]?.series?.available === 0 ? "" : (
                                    <div>
                                        <h2 className='comics-heading' onClick={() => setIsSeriesOpen(!isSeriesOpen)}>Series</h2>
                                        <ul className={`comics-list ${isSeriesOpen ? 'open' : ''}`}>
                                            {
                                                characterData[0]?.series?.items.map((s, i) => (
                                                    <li key={i}>{s.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }

                            {
                                characterData[0]?.stories?.available === 0 ? "" : (
                                    <div>
                                        <h2 className='comics-heading' onClick={() => setIsStoriesOpen(!isStoriesOpen)}>Stories</h2>
                                        <ul className={`comics-list ${isStoriesOpen ? 'open' : ''}`}>
                                            {
                                                characterData[0].stories.items.map((s, i) => (
                                                    <li key={i}>{s.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }

                            {
                                characterData[0]?.events?.available === 0 ? "" : (
                                    <div>
                                        <h2 className='comics-heading' onClick={() => setIsEventsOpen(!isEventsOpen)}>Events</h2>
                                        <ul className={`comics-list ${isEventsOpen ? 'open' : ''}`}>
                                            {
                                                characterData[0].events.items.map((s, i) => (
                                                    <li key={i}>{s.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }

                            <h2 className='comics-heading' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Urls</h2>
                            <ul className={`comics-list ${isDropdownOpen ? 'open' : ''}`}>
                                {characterData[0].urls.map((url, index) => (
                                    <li key={index}>
                                        <a className='some-url' href={url.url} target='_blank'>{url.type}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer/>
        </div>
    );

};

export default Character;
