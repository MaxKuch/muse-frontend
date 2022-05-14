import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAudio } from '../../models/types'
import { shuffle } from '../../utils/functions'

interface ISongsQueueState {
    queue: IAudio[];
    shuffled: boolean;
    bufQueue: IAudio[];
}

const initialState: ISongsQueueState = {
    queue: [],
    shuffled: false,
    bufQueue: [],
}

export const songsQueueSlice = createSlice({
    name: 'songsQueue',
    initialState,
    reducers: {
        setQueue(state, action: PayloadAction<ISongsQueueState['queue']>) {
            state.queue = action.payload
            state.shuffled = false
        },
        shuffleQueue(state) {
            if(state.shuffled) {
                state.shuffled = false
                state.queue = [...state.bufQueue]
                return
            }
            state.shuffled = true
            state.bufQueue = [...state.queue]
            state.queue = shuffle(state.queue)
        }
    }
})

export default songsQueueSlice.reducer