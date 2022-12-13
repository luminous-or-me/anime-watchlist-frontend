import Anime from "./Anime"

const ToWatch = ({ anime, handleWatched }) => (
    <div>
        {anime.map(a => <Anime key={a.id} anime={a} handleWatched={() => handleWatched(a.id)} />)}
    </div>
)

export default ToWatch