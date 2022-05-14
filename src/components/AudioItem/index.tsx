import { useState, useEffect } from 'react'
import { IAudioItem } from '../../models/components'
import style from './AudioItem.module.scss'
import { useAudioContext } from '../AudioContext'
import { formatTime } from '../../utils/functions'
import PlayButton from '../PlayButton'
import AddToFavorites from '../AddToFavorites'
import Logo from '../Logo'
import { Link } from 'react-router-dom'


const AudioItem:React.FC<IAudioItem> = ({song, onPlay}) => {
    const { currentSong, playing, audio, toggleAudioPlaying, currentTime } = useAudioContext()
    
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null) 

    const toggleAudioHandler = () => { 
        if(!currentAudio) return
        toggleAudioPlaying(song, currentAudio)
        if(onPlay) onPlay()
    }

    useEffect(() => {
        if(currentSong?._id === song._id && !currentAudio) {
            setCurrentAudio(audio)
            return
        }
        if(currentAudio) return
        const aud = new Audio(song.src)
        
        aud.addEventListener('loadedmetadata', () => {
            setCurrentAudio(aud)
        })
    }, [currentSong, song, audio, currentAudio])
    
    return (
        <div className={style.audioItem}>
            <div className={style.audioItemThumb} onClick={toggleAudioHandler}>
                <img src={song.thumbnail || song.album.thumbnail} className={style.audioItemCover} alt='cover'/>
                {
                    currentSong?._id === song._id && playing ?
                    <div className={style.audioItemPlayingAnimation}>
                        <Logo size={25} animated={true}/>
                    </div> :
                    ''
                }
                <PlayButton extraClasses={[style.audioItemPlayButton, playing && currentSong?._id === song._id ? 'd-none' : '']} playing={playing && currentSong?._id === song._id} />
            </div>
            <div className={style.audioItemInfo}>
                <h3>
                    <Link className={style.audioItemName} to={`/album/${song.album?._id}`}>{song.name}</Link>
                </h3>
                <h4>
                    <Link className={style.audioItemAuthor} to={`/artist/${song.artist?._id}`}>{song.artist?.name}</Link>
                </h4>
            </div>
            <div className={style.audioItemExtra}>
                <div className={style.songTime}>
                    {currentAudio && formatTime(currentSong?._id === song._id ? currentTime : currentAudio.duration)}
                </div>
                <div className={style.audioItemAddToFavorites}><AddToFavorites song={song}/></div>
            </div>
        </div>
    )
}

export default AudioItem