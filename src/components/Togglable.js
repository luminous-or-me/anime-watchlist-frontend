import { useState } from "react"

const Togglable = (props) => {
    const [hidden, setHidden] = useState(true)

    const visibleStyle = {
        display: hidden ? 'none' : ''
    }
    const hiddenStyle = {
        display: hidden ? '' : 'none'
    }

    return (
        <div>
            <div style={visibleStyle}>
                <div>
                    {props.children}
                </div>
                <button onClick={() => setHidden(true)}>
                    cancel
                </button>
            </div>
            <div style={hiddenStyle}>
                <button onClick={() => setHidden(false)}>
                    {props.buttonLabel}
                </button>
            </div>
        </div>
    )
}

export default Togglable