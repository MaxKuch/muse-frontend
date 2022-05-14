import styles from './AddToFavorites.module.scss'
import { IAddToFavorites } from '../../models/components'
import classNames from 'classnames'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/userSlice'
import { authAPI } from '../../services/authService'



const AddToFavorites:React.FC<IAddToFavorites> = ({ song }) => {
    const dispatch = useAppDispatch()
    const { favoriteSongs, isAuth } = useAppSelector(state => state.userReducer)
    const { addSongToFavorites, removeSongFromFavorites } = userSlice.actions
    const [add] = authAPI.useAddSongToFavoritesMutation()
    const [remove] = authAPI.useRemoveSongFromFavoritesMutation()

    const addToFavorites = async () => {
        if(favoriteSongs.some(s => s._id === song._id)) {
            dispatch(removeSongFromFavorites(song._id))
            await remove(song._id)
            return
        }
        dispatch(addSongToFavorites(song))
        await add(song._id)
    }

    if(!isAuth) return <></>
    return (
        <button className={classNames([styles.addToFavorites, favoriteSongs.some(s => s._id === song._id) ? styles.deleteFromFavorites : ''])} onClick={addToFavorites}></button>
    )
}

export default AddToFavorites