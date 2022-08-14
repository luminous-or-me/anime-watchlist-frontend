import { useState } from "react"

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
      {props.anime.name}
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

const App = () => {
  const [anime, setAnime] = useState([
    {
      id: 1,
      name: "My Hero Academia",
      link: "link 1",
      watched: false
    },
    {
      id: 2,
      name: "Demon Slayer",
      link: "link 2",
      watched: false
    },
    {
      id: 3,
      name: "Cowboy Bebop",
      link: "link 3",
      watched: false
    },
    {
      id: 4,
      name: 'Steins;Gate',
      link: 'link 4',
      watched: true
    },
    {
      id: 5,
      name: 'Tomodachi Game',
      link: 'link 5',
      watched: true
    }
  ])
  const [newName, setNewName] = useState('')
  const [newLink, setNewLink] = useState('')
  const [addHidden, setAddHidden] = useState(true)
  const [filter, setFilter] = useState('')

  const shownAnime = anime
    .filter(a => !a.watched)
    .filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))

  const history = anime
    .filter(a => a.watched)

  const handleWatched = (id) => {
    console.log(`watched ${id}`)
    setAnime(anime.filter(a => a.id !== id))
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
      id: Math.floor(Math.random() * 10000)
    }

    console.log(newAnime)

    setAnime(anime.concat(newAnime))

    setNewName('')
    setNewLink('')
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

      {history.map(a => <p>{a.name}</p>)}
    </div>
  )
}

export default App
