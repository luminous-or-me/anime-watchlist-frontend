import { useState } from "react"

const Togglable = ({ children, buttonLabel }) => {
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
                    {children}
                </div>
                <button onClick={() => setHidden(true)}>
                    cancel
                </button>
            </div>
            <div style={hiddenStyle}>
                <button onClick={() => setHidden(false)}>
                    {buttonLabel}
                </button>
            </div>
        </div>
    )
}

export default Togglable