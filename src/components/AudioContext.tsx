import { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'
import { IAudio } from '../models/types'
import {useForceUpdate} from '../hooks/useForceUpdate'
import { useAppSelector } from '../hooks/redux'
import { songsAPI } from '../services/songsService'

export type TSetAudio = Omit<IAudioContext, 'setAudioContext' | 'toggleAudioPlaying'>

export interface IAudioContext {
    currentSong: IAudio | null;
    setAudioContext: (a: Object) => void;
    audio: HTMLAudioElement | null,
    playing: boolean,
    toggleAudioPlaying: (newAudio: IAudio, src: IAudioContext['audio']) => void,
    currentTime: number
}

export const AudioContext = createContext<IAudioContext>({
    currentSong: null,
    setAudioContext: () => {},
    audio: null,
    playing: false,
    toggleAudioPlaying: () => {},
    currentTime: 0
})

export const useAudioContext = () => useContext(AudioContext)

export const AudioContextProvider:React.FC = ({children}) => {
    const { queue } = useAppSelector(state => state.songsQueueReducer)
    const [incrementListens] = songsAPI.useIncrementListensMutation()

    const [{audio, currentSong, playing, currentTime}, setAudio] = useState<TSetAudio>({audio: null, currentSong: null, playing: false, currentTime: 0})
    const forceUpdate = useForceUpdate()

    const setAudioContext = (props: Object) => { setAudio(prev => ({...prev, ...props})) }

    useEffect(() => {
        if(currentSong && playing) incrementListens(currentSong._id)
        if(!queue.length || currentSong) return
        const firstSong = queue[0]
        const aud = new Audio(firstSong.src)
        aud.addEventListener('loadedmetadata', () => {
            setAudioContext({audio: aud, currentSong: firstSong})
        })
    }, [queue, currentSong, incrementListens, playing])
    
    useEffect(() => {
        if(audio) {
            audio.addEventListener('ended', () => {
                setAudioContext({playing: false})
            })
        }
    }, [audio]) 

    useEffect(() => {
        audio?.addEventListener('timeupdate', () => {
            setAudioContext({currentTime: audio?.currentTime})
        })
    }, [audio])

    const toggleAudioPlaying = (newAudio: IAudio, currentAudio: IAudioContext['audio']) => { 
        if(audio !== null) {
            if(currentSong?._id === newAudio._id) {
                if(audio.paused) {
                    audio.play()
                    setAudioContext({playing: true})
                    return
                }
                audio.pause()
                setAudioContext({playing: false})
                return
            }

            audio.pause()
            setAudioContext({currentSong: newAudio, audio: currentAudio, playing: true})
            currentAudio?.play()
            return
        }
        setAudioContext({currentSong: newAudio, audio: currentAudio, playing: true})
        forceUpdate()
    }

    return (
      <AudioContext.Provider value={{audio, currentSong, playing, toggleAudioPlaying, setAudioContext, currentTime}}>{children}</AudioContext.Provider>
    )
}
  