import { useEffect, useState } from "react"
import animeServices from "./services/animes"
import loginServices from './services/login'
import AddAnimeForm from "./components/AddAnimeForm"
import ToWatch from "./components/ToWatch"
import Filter from "./components/Filter"
import History from "./components/History"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"

const App = () => {
  const [anime, setAnime] = useState([])
  const [filter, setFilter] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(true)

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

      setSuccess(true)
      setMessage(`added anime ${addedAnime.name}`)
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      console.log(error.response.data.error)
      setSuccess(false)
      setMessage(error.response.data.error)
      setTimeout(() => setMessage(null), 5000)
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

      setSuccess(true)
      setMessage(`logged in as ${user.name}`)
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      console.log(error.response.data.error)
      setSuccess(false)
      setMessage(error.response.data.error)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setMessage('logged out')
    setSuccess(true)
    setTimeout(() => setMessage(null), 5000)
  }

  if (!user) {
    return (
      <div>
        <Notification
          message={message}
          success={success}
        />

        <h2>login to the application</h2>

        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <Notification
        message={message}
        success={success}
      />

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
