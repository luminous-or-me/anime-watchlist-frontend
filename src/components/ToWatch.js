import Anime from "./Anime"

const ToWatch = ({ anime, handleWatched }) => (
    <ul>
        {anime.map(a => <Anime key={a.id} anime={a} handleWatched={() => handleWatched(a.id)} />)}
    </ul>
)

export default ToWatch