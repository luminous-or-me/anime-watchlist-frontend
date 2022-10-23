import Anime from "./Anime"

const History = (props) => (
    <ul>
        {props.history.map(a => <Anime key={a.id} anime={a} handleDelete={() => props.handleDelete(a.id)} />)}
    </ul>
)

export default History