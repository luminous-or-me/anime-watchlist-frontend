import { useEffect, useState } from "react"
import animeServices from "./services/animes"
import loginServices from './services/login'

const AddAnimeForm = (props) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    console.log(`submitting anime ${name}`)
    await props.createAnime({
      name, link
    })
    setName('')
    setLink('')
  }

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

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    console.log(`logging in with username ${username}`)
    await props.login({
      username,
      password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
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
            placeholder='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  )
}

const Togglable = (props) => {
  const [hidden, setHidden] = useState(true)

  const visibleStyle = {
    display: hidden ? 'none' : ''
  }
  const hiddenStyle = {
    display: hidden ? '' : 'none'
  }

  return (
    <div>
      <div style={visibleStyle}>
        <div>
          {props.children}
        </div>
        <button onClick={() => setHidden(true)}>
          cancel
        </button>
      </div>
      <div style={hiddenStyle}>
        <button onClick={() => setHidden(false)}>
          {props.buttonLabel}
        </button>
      </div>
    </div>
  )
}

const App = () => {
  const [anime, setAnime] = useState([])
  const [filter, setFilter] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))

    if (loggedInUser) {
      setUser(loggedInUser)
      animeServices.setToken(loggedInUser.token)
    }
  }, [])

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

  const createAnime = async newAnime => {
    try {
      const addedAnime = await animeServices.create(newAnime)
      console.log(addedAnime)
      setAnime(anime.concat(addedAnime))
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

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

  const login = async credentials => {
    try {
      const user = await loginServices.login(credentials)

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)

      animeServices.setToken(user.token)
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if (!user) {
    return (
      <div>
        <h2>login to the application</h2>

        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>Anime Watchlist</h2>

      <p>
        logged in as {user.name} <button onClick={handleLogout}>log out</button>
      </p>

      <Togglable buttonLabel='add anime'>
        <h2>add anime to watchlist</h2>
        <AddAnimeForm createAnime={createAnime} />
      </Togglable>

      <h3>anime to watch</h3>

      <Filter filter={filter} onFilterChange={handleFilter} />

      <ToWatch anime={shownAnime} handleWatched={handleWatched} />

      <h3>History</h3>

      <History history={history} handleDelete={handleDelete} />
    </div>
  )
}

export default App
