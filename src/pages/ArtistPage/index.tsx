import styles from './ArtistPage.module.scss'
import { Link, useParams } from 'react-router-dom'
import { artistsAPI } from '../../services/artistsService'
import { songsAPI } from '../../services/songsService'
import { albumsAPI } from '../../services/albumsService'
import useSetQueue from '../../hooks/useSetQueue'
import AudioItem from '../../components/AudioItem'
import { motion } from "framer-motion"
import Card from '../../components/Card'
import { Row, Col } from 'antd'
import Logo from '../../components/Logo'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const ArtistPage: React.FC = () => {
    const params = useParams()
    const { data: artist, isLoading: isArtistLoading, isError } = artistsAPI.useFetchArtistQuery(params.id ?? skipToken)
    const { data: songs, isLoading: isSongsLoading} = songsAPI.useFetchArtistsSongsQuery(artist?._id ? {artistId: artist?._id, limit: 5, sortByListens: true} : skipToken)
    const { data: albums, isLoading: isAlbumsLoading} = albumsAPI.useFetchArtistsAlbumsQuery(artist?._id ?? skipToken)
    const { songPlayedHandler } = useSetQueue(songs || [])

    return (
        <div className={styles.artist}>
            {!isArtistLoading && !isSongsLoading && !isAlbumsLoading ? 
                <>
                    {isError ?
                        <h1 className='t-center'>Исполнитель не найден</h1> :
                        <Row gutter={30} className={styles.artistHeader}>
                            <Col className='d-flex align-center justify-center' sm={{span: 10}} md={{span: 8}} span={24}><div className={styles.artistPicture}><img src={artist?.thumbnail} alt={artist?.name + ' picture'} /></div></Col>
                            <Col className='d-flex direction-column justify-center' sm={{span: 14}} md={{span: 16}} span={24}>
                                <h1>{artist?.name}</h1>
                                <p>{artist?.description}</p>
                            </Col>
                        </Row>
                    }
                    {(songs && songs.length !== 0) && <h2 className={styles.sectionTitle}>Популярные песни</h2> }
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
                    {(albums && albums.length !== 0) && <h2 className={styles.sectionTitle}>Альбомы</h2>}
                    <Row gutter={[15, 15]}>
                        {
                            albums && albums.map(album => (
                                <Col key={album._id} span={24} lg={{span: 6}} md={{ span: 8}} sm={{ span: 12 }}>
                                    <Link
                                        to={`/album/${album._id}`}
                                        className={styles.album}
                                        key={album._id}
                                    >
                                    <Card size='small' image={album.thumbnail} title={album.name}/>
                                    </Link>
                                </Col>
                            ))
                        }
                    </Row>
                </> :
                <div className='d-flex justify-center'> <Logo size={40} animated={true} /> </div>}
            
        </div>
    )
}

export default ArtistPage

