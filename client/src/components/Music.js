import React from 'react'
import musica from '../../Assets/audio/friends.mp3'
const Musica = () => {
    return (
        <audio className="audio">
            <source src={musica} />
        </audio>
    )
}

export default Musica
