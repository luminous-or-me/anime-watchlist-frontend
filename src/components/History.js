import Anime from "./Anime"

const History = ({ history, handleDelete }) => (
    <ul>
        {history.map(a => <Anime key={a.id} anime={a} handleDelete={() => handleDelete(a.id)} />)}
    </ul>
)

export default History