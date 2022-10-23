const Anime = (props) => (
    <li>
        <a href={props.anime.link} target="blank">{props.anime.name}</a>
        {props.anime.watched ?
            <button onClick={props.handleDelete}>delete</button>
            : <button onClick={props.handleWatched}>watched</button>}
    </li>
)

export default Anime