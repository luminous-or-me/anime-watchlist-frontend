import { useEffect, useState } from "react"
import animeServices from "./services/animes"

const AddAnime = (props) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    console.log(`submitting anime ${name}`)
  }

  if (!props.addHidden) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='name'
          />
        </div>
        <div>
          <input
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder='link'
          />
        </div>

        <button type='submit'>
          save
        </button>
      </form>
    )
  } else {
    return null
  }
}

const Anime = (props) => (
  <li>
    <a href={props.anime.link} target="blank">{props.anime.name}</a>
    {props.anime.watched ?
      <button onClick={props.handleDelete}>delete</button>
      : <button onClick={props.handleWatched}>watched</button>}
  </li>
)

const ToWatch = (props) => (
  <ul>
    {props.anime.map(a => <Anime key={a.id} anime={a} handleWatched={() => props.handleWatched(a.id)} />)}
  </ul>
)

const Filter = (props) => (
  <div>
    filter <input
      value={props.filter}
      onChange={props.onFilterChange}
    />
  </div>
)

const History = (props) => (
  <ul>
    {props.history.map(a => <Anime key={a.id} anime={a} handleDelete={() => props.handleDelete(a.id)} />)}
  </ul>
)

const App = () => {
  const [anime, setAnime] = useState([])

  const [addHidden, setAddHidden] = useState(true)
  const [filter, setFilter] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    animeServices
      .getAll()
      .then(anime => setAnime(anime))
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

    animeServices
      .update(id, newAnime)
      .then(newAnime => {
        setAnime(anime.map(a => a.id !== id ? a : newAnime))
      })
  }

  const handleDelete = (id) => {
    console.log(`remove ${id} from history`)

    animeServices.remove(id)
      .then(response => {
        console.log('success')

        setAnime(anime.filter(a => a.id !== id))
      })
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleLogin = event => {
    event.preventDefault()
    console.log(`logging in with username ${username}`)
  }

  if (!user) {
    return (
      <div>
        <h2>login to the application</h2>

        <form onSubmit={handleLogin}>
          <div>
            <input
              placeholder='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button>
            log in
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Anime Watchlist</h2>

      <button onClick={() => setAddHidden(!addHidden)}>
        {addHidden ? 'add to watchlist' : 'hide'}
      </button>

      <AddAnime
        addHidden={addHidden}
      />

      <h3>anime to watch</h3>

      <Filter filter={filter} onFilterChange={handleFilter} />

      <ToWatch anime={shownAnime} handleWatched={handleWatched} />

      <h3>History</h3>

      <History history={history} handleDelete={handleDelete} />
    </div>
  )
}

export default App
