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
      link: "link 1"
    },
    {
      id: 2,
      name: "Demon Slayer",
      link: "link 2"
    },
    {
      id: 3,
      name: "Cowboy Bebop",
      link: "link 3"
    }
  ])
  const [newName, setNewName] = useState('')
  const [newLink, setNewLink] = useState('')
  const [addHidden, setAddHidden] = useState(true)
  const [filter, setFilter] = useState('')

  const filteredAnime = anime.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))

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

      <ToWatch anime={filteredAnime} handleWatched={handleWatched} />
    </div>
  )
}

export default App
