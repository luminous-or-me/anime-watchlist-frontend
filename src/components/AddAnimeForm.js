import { useState } from "react"

const AddAnimeForm = ({ createAnime }) => {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()
        console.log(`submitting anime ${name}`)
        await createAnime({
            name, link
        })
        setName('')
        setLink('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='name'
                />
            </div>
            <div>
                <input
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    placeholder='link'
                />
            </div>

            <button type='submit'>
                save
            </button>
        </form>
    )
}

export default AddAnimeForm