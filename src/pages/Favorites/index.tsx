import {useState, useEffect} from 'react'
import AudioItem from '../../components/AudioItem'
import { motion } from "framer-motion"
import styles from './Favorites.module.scss'
import useSetQueue from '../../hooks/useSetQueue'
import { useAppSelector } from '../../hooks/redux'
import { Input } from 'antd'

const Favorites:React.FC = () => {
  const { favoriteSongs } = useAppSelector(state => state.userReducer)
  const [filteredFavSongs, setFilteredFavSongs] = useState(favoriteSongs)
  const { songPlayedHandler } = useSetQueue(filteredFavSongs)

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const query = e.target.value
    const regExp = new RegExp(query, 'i')
    
    setFilteredFavSongs(favoriteSongs.filter(audio => regExp.test(audio.name) ))
  }

  useEffect(() => {
    setFilteredFavSongs(favoriteSongs)
  }, [favoriteSongs])
  

  return (
    <>
      <Input className='input mb-10' placeholder='Найти песню' onChange={searchHandler}/>
      <div className={styles.favoriteSongs}>
        {filteredFavSongs.length !== 0 && filteredFavSongs.map((song, idx) => (
          <motion.div 
            className='mb-10' 
            key={song._id}
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: .15, delay: idx / 12, x: { ease: 'backOut'} }}
          >
            <AudioItem song={song} onPlay={songPlayedHandler}/>
          </motion.div>
        )) 
      }
      {favoriteSongs.length === 0 && <h2 className={styles.emptyMessage}>Упс, похоже вы сюда ничего не добавили</h2>}
      </div>
    </>
  )
}

export default Favorites