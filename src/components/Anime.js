const Anime = ({ anime, handleDelete, handleWatched }) => (
    <li>
        <a href={anime.link} target="blank">{anime.name}</a>
        {
            anime.watched ?
                <button onClick={handleDelete}>delete</button>
                : <button onClick={handleWatched}>watched</button>
        }
    </li>
)

export default Anime