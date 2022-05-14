import styles from './AlbumPage.module.scss'
import { Link, useParams } from 'react-router-dom'
import { songsAPI } from '../../services/songsService'
import { albumsAPI } from '../../services/albumsService'
import useSetQueue from '../../hooks/useSetQueue'
import AudioItem from '../../components/AudioItem'
import { motion } from "framer-motion"
import { Row, Col } from 'antd'
import Logo from '../../components/Logo'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const ArtistPage: React.FC = () => {
    const params = useParams()
    const { data: album, isLoading: isAlbumLoading, isError } = albumsAPI.useFetchAlbumQuery(params?.id ?? skipToken)
    const { data: songs, isLoading: isSongsLoading } = songsAPI.useFetchAlbumsSongsQuery(album?._id ?? skipToken)
    const { songPlayedHandler } = useSetQueue(songs || [])
    return (
        <div className={styles.album}>
            {!isAlbumLoading && !isSongsLoading ? 
            <>
                {isError ?
                    <h1 className='t-center'>Альбом не найден</h1> :
                    <Row gutter={30} className={styles.albumHeader}>
                        <Col className='d-flex align-center justify-center mb-10' sm={{span: 10}} md={{span: 8}} span={24}><div className={styles.albumPicture}><img src={album?.thumbnail} alt={album?.name + ' picture'} /></div></Col>
                        <Col className='d-flex direction-column justify-center' sm={{span: 14}} md={{span: 16}} span={24}>
                                <h1>{album?.name} <span><Link to={`/artist/${album?.artist._id}`}>{album?.artist.name}</Link></span></h1>

                            
                            <p>{album?.description}</p>
                        </Col>
                    </Row>
                }
                {
                    songs && songs.map((song, idx) => (
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
            </> :
            <div className='d-flex justify-center'> <Logo size={40} animated={true}/> </div>}
        </div>
    )
}

export default ArtistPage

