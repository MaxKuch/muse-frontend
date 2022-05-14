import { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import styles from './Player.module.scss'
import PlayButton from '../PlayButton'
import { formatTime } from '../../utils/functions'
import { Slider } from 'antd'
import { useAudioContext } from '../AudioContext'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { songsQueueSlice } from '../../store/reducers/songsQueueSlice'
import { Link } from 'react-router-dom'
import { ShuffleIcon, VolumeHighIcon, VolumeMediumIcon, VolumeLowIcon, VolumeMuteIcon, NextArrowIcon, PrevArrowIcon, IconProps } from '../Icons'

interface VolumeIconProps extends IconProps {
    volume: number;
}

const VolumeIcon:React.FC<VolumeIconProps> = ({ volume, ...props }) => {
    if(volume === 0) return <VolumeMuteIcon {...props}/>
    if(volume < 30) return <VolumeLowIcon {...props}/>
    if(volume < 60) return <VolumeMediumIcon {...props}/>
    return <VolumeHighIcon {...props}/>
}

const Player:React.FC = () => {
    const { queue, shuffled } = useAppSelector(state => state.songsQueueReducer)
    const { currentSong, playing, audio, toggleAudioPlaying, currentTime } = useAudioContext()
    const { shuffleQueue } = songsQueueSlice.actions
    const dispatch = useAppDispatch()
    const [currentProgress, setCurrentProgress] = useState(0)
    const [currentVolume, setCurrentVolume] = useState(50)


    const shuffleHandler = () => { dispatch(shuffleQueue()) }

    const playButtonHandler = () => { 
        if(currentSong)
            toggleAudioPlaying(currentSong, null)
    }

    const progressChangeHandler = (value: number) => { 
        if(audio) audio.currentTime = value
    }

    const volumeChangeHandler = (value: number) => {
        setCurrentVolume(value)
    }

    const switchSong = useCallback((dir: number) => { 
        if(queue.length === 0 || !currentSong) return

        const currSongIdx = queue.reduce((currSongIdx, song, idx) => {
            if(song._id === currentSong._id) currSongIdx = idx
            return currSongIdx
        }, -1)

        const newSong = queue[(currSongIdx + queue.length + dir) % queue.length]
        const aud = new Audio(newSong.src)
        const canplayHandler = () => {
            if(newSong._id !== currentSong._id)
                toggleAudioPlaying(newSong, aud)
            aud.removeEventListener('loadedmetadata', canplayHandler)
        }
        aud.addEventListener('loadedmetadata', canplayHandler)

    }, [queue, currentSong, toggleAudioPlaying])

    useEffect(() => {
        if(audio) {
            audio.volume = currentVolume / 100
        }
    }, [audio, currentVolume])

    const muteHandler = () => {
        if(audio){
            if(currentVolume === 0) setCurrentVolume(50)
            else setCurrentVolume(0)
        }
    }

    useEffect(() => {
        const endedHandler = () => { 
            if(audio) switchSong(1) 
        }
        
        const timeupdateHandler = () => { 
            if(audio) setCurrentProgress(audio.currentTime) }

        if(audio) {
            audio.addEventListener('timeupdate', timeupdateHandler)
            audio.addEventListener('ended', endedHandler) 
        }
        return () => {
            audio?.removeEventListener('timeupdate', timeupdateHandler)
            audio?.removeEventListener('ended', endedHandler)
        }
    }, [audio, switchSong])
    
    return (
        <div className={styles.player}>
            <div className={styles.track}>
                <Slider 
                    defaultValue={0} 
                    max={audio?.duration} 
                    value={currentProgress}
                    onChange={progressChangeHandler}
                />
            </div>
            <div className={styles.body}>
                <div className={styles.controls}>
                    <button className={styles.arrow} onClick={() => switchSong(-1)}><PrevArrowIcon /></button>
                    <PlayButton onClick={playButtonHandler} extraClasses={[styles.playButton]} playing={playing}/>
                    <button className={styles.arrow} onClick={() => switchSong(1)}><NextArrowIcon/></button>
                </div>
                <img src={currentSong?.thumbnail || currentSong?.album?.thumbnail} className={styles.songCover} alt='cover'/>
                <div className={styles.songInfo}>
                    <Link className={styles.songName} to={`album/${currentSong?.album?._id}`}>{currentSong?.name}</Link>
                    <Link className={styles.songAuthor} to={`artist/${currentSong?.artist?._id}`}>{currentSong?.artist?.name}</Link>  
                </div>
                <ShuffleIcon className={classNames([styles.shuffleButton, shuffled ? styles.shuffleButtonActive : ''])} onClick={shuffleHandler}/>
                <div className={styles.songVolume}>
                    <VolumeIcon className={styles.songVolumeIcon} volume={currentVolume} onClick={muteHandler} />
                    <div className={styles.volumeSlider}>
                        <Slider 
                            value={currentVolume}
                            max={100} 
                            vertical={true}
                            onChange={volumeChangeHandler}
                        />
                    </div>
                </div>
                <div className={styles.songTime}>
                    {formatTime(currentTime)} / {formatTime(audio?.duration || 0)}
                </div>
            </div>
        </div>
    )
}

export default Player