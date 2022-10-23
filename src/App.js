import { useEffect, useState } from "react"
import animeServices from "./services/animes"
import loginServices from './services/login'
import AddAnimeForm from "./components/AddAnimeForm"
import ToWatch from "./components/ToWatch"
import Filter from "./components/Filter"
import History from "./components/History"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"

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
