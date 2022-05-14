import { useEffect } from 'react'
import { IAudio } from '../models/types'
import { songsQueueSlice } from '../store/reducers/songsQueueSlice'
import { useAppDispatch, useAppSelector } from './redux'

const useSetQueue = (songs: IAudio[]) => { 
    const state = useAppSelector(state => state)
    const { queue } = state.songsQueueReducer
    const { setQueue } = songsQueueSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(queue.length || !songs.length) return
        dispatch(setQueue(songs))
    }, [queue, songs, setQueue, dispatch])
    
    const songPlayedHandler = () => {
      dispatch(setQueue(songs))
    }

    return { songPlayedHandler, queue } 
}

export default useSetQueue