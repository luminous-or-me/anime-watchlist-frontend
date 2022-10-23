const Notification = ({ message, success }) => {
    const style = {
        color: success? 'green' : 'red',
        backgroundColor: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderWidth: '3px',
        borderColor: success? 'green' : 'red',
        borderRadius: '10px',
        padding: '15px 10px',
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