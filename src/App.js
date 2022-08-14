import { useEffect, useState } from "react"
import axios from "axios"

const AddAnime = (props) => {
  if (!props.addHidden) {
    return (
      <form onSubmit={props.onSubmit}>
        name <input value={props.name} onChange={props.onNameChange} /><br />
        link <input value={props.link} onChange={props.onLinkChange} /><br />
        <button>save</button>
      </form>
    )
  } else {
    return null
  }
}

const Anime = (props) => {
  return (
    <li>
      <a href={props.anime.link} target="blank">{props.anime.name}</a>
      <button onClick={props.handleWatched}>watched</button>
    </li>
  )
}

const ToWatch = (props) => {
  return (
    <ul>
      {props.anime.map(a => <Anime key={a.id} anime={a} handleWatched={() => props.handleWatched(a.id)} />)}
    </ul>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter <input
        value={props.filter}
        onChange={props.onFilterChange}
      />
    </div>
  )
}

const History = (props) => {
  return (
    <div>
      {props.history.map(a => <p key={a.id}>{a.name}</p>)}
    </div>
  )
}

const App = () => {
  const [anime, setAnime] = useState([])
  const [newName, setNewName] = useState('')
  const [newLink, setNewLink] = useState('')
  const [addHidden, setAddHidden] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/api/anime')
      .then(response => {
        console.log(response.data)
        setAnime(response.data)
      })
  }, [])

  const shownAnime = anime
    .filter(a => !a.watched)
    .filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))

  const history = anime
    .filter(a => a.watched)

  const handleWatched = (id) => {
    console.log(`watched ${id}`)

    const foundAnime = anime.find(a => a.id === id)

    const newAnime = { ...foundAnime, watched: true }

    axios
      .put(`http://localhost:3001/api/anime/${id}`, newAnime)
      .then(response => {
        console.log(response.data)

        setAnime(anime.map(a => a.id !== id ? a : response.data))
      })
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewLink = (event) => {
    setNewLink(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(`save anime ${newName}`)
    const newAnime = {
      name: newName,
      link: newLink,
      watched: false
    }

    console.log(newAnime)

    axios.post('http://localhost:3001/api/anime', newAnime)
      .then(response => {
        console.log(response.data)

        setAnime(anime.concat(response.data))

        setNewName('')
        setNewLink('')
      })
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Anime Watchlist</h2>

      <button onClick={() => setAddHidden(!addHidden)}>
        {addHidden ? 'add to watchlist' : 'hide'}
      </button>

      <AddAnime
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={handleNewName}
        link={newLink}
        onLinkChange={handleNewLink}
        addHidden={addHidden}
      />

      <h3>anime to watch</h3>

      <Filter filter={filter} onFilterChange={handleFilter} />

      <ToWatch anime={shownAnime} handleWatched={handleWatched} />

      <h3>History</h3>

      <History history={history} />
    </div>
  )
}

export default App
