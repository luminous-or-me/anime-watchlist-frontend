import { useState } from "react"

const AddAnime = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      name <input value={props.name} onChange={props.onNameChange} /><br />
      link <input value={props.link} onChange={props.onLinkChange} /><br />
      <button>save</button>
    </form>
  )
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
  const [newName, setNewName] = useState('')
  const [newLink, setNewLink] = useState('')

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

  return (
    <div>
      <h2>Anime Watchlist</h2>

      <h3>add to watchlist</h3>

      <AddAnime
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={handleNewName}
        link={newLink}
        onLinkChange={handleNewLink}
      />

      <h3>anime to watch</h3>

      <ToWatch anime={anime} handleWatched={handleWatched} />
    </div>
  )
}

export default App
