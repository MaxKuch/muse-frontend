import { useRef } from 'react'
import AudioItem from '../AudioItem'
import { motion } from "framer-motion"
import useSetQueue from '../../hooks/useSetQueue'
import useSearch from '../../hooks/useSearch'
import useLazyLoading from '../../hooks/useLazyLoading'
import { songsAPI, IFetchSongsParams, IFetchSongsResponse } from '../../services/songsService'
import Logo from '../Logo'
import { IAudio } from '../../models/types'
import { Input } from 'antd'

const PopularSongs:React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  
  const [trigger, {data: songsResponse, isFetching}, { lastArg }] = songsAPI.useLazyFetchSongsQuery()
  
  const songs = useLazyLoading<IAudio, IFetchSongsResponse>(
    {
      offset: 0,
      searchQuery: '',
      sortByListens: true
    } as IFetchSongsParams,
    songsResponse?.songs,
    trigger,
    ref.current,
    isFetching,
    lastArg,
    songsResponse?.songsAmount ?? 0,
    5
  )

  const searchHandler = useSearch(
    {
      offset: 0,
      searchQuery: '',
      sortByListens: true
    } as IFetchSongsParams,
    trigger
  )

  const { songPlayedHandler } = useSetQueue(songs)

  return (
    <>
      <Input className='input mb-10' placeholder='Найти песню' onChange={searchHandler}/>
      <div ref={ref} className='main-page-content-wrapper'>
        {songs.map((song, idx) => (
          <motion.div 
            className='mb-10' 
            key={song._id}
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: .15, delay: idx / 12, x: { ease: 'backOut'} }}
          >
            <AudioItem song={song} onPlay={songPlayedHandler}/>
          </motion.div>
        ))}
        {isFetching && <div className='d-flex justify-center'> <Logo size={40} animated={true}/> </div>}
      </div>
    </>
  )
}

export default PopularSongs