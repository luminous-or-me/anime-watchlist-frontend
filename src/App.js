import { useState } from "react"

const Anime = (props) => {
  return (
    <li>
      {props.anime.name}
      <button onClick={props.handleWatched}>watched</button>
    </li>
  )
}

const ToWatch = (props) => {
  return (
    <ul>
      {props.anime.map(a => <Anime key={a.id} anime={a} handleWatched={() => props.handleWatched(a.id)}/>)}
    </ul>
  )
}

const App = () => {
  const [anime, setAnime] = useState([
    {
      id: 1,
      name: "anime 1",
      link: "link 1"
    },
    {
      id: 2,
      name: "anime 2",
      link: "link 2"
    },
    {
      id: 3,
      name: "anime 3",
      link: "link 3"
    }
  ])

  const handleWatched = (id) => {
    console.log(`watched ${id}`)
    setAnime(anime.filter(a => a.id !== id))
  }

  return (
    <div>
      <h2>Anime Watchlist</h2>

      <h3>anime to watch</h3>

      <ToWatch anime={anime} handleWatched={handleWatched}/>
    </div>
  )
}

export default App
