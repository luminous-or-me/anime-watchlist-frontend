import { useState } from "react"

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async event => {
        event.preventDefault()
        console.log(`logging in with username ${username}`)
        await props.login({
            username,
            password
        })

        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        placeholder='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder='password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>log in</button>
            </form>
        </div>
    )
}

export default LoginForm