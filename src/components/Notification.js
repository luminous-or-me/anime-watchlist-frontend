const Notification = ({ message }) => {
    const style = {
        color: 'grey',
        backgroundColor: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderWidth: '3px',
        borderColor: 'grey',
        borderRadius: '10px',
        padding: '15px 5px',
    }

    if (message) {
        return (
            <div style={style}>
                {message}
            </div>
        )
    }

    return null
}

export default Notification