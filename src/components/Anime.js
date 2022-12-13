const Anime = ({ anime, handleDelete, handleWatched }) => {
    const style = {
        padding: '15px 10px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '5px',
        margin: '10px 0px'
    }

    return (
        <div style={style}>
            <div>
                <a href={anime.link}>{anime.name}</a>
            </div>
            <div>
                Uploaded by {anime.user.name}
            </div>
        </div>
    )
}

export default Anime