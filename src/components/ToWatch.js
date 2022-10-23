import Anime from "./Anime"

const ToWatch = (props) => (
    <ul>
        {props.anime.map(a => <Anime key={a.id} anime={a} handleWatched={() => props.handleWatched(a.id)} />)}
    </ul>
)

export default ToWatch