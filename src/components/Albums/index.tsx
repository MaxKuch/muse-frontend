import {useRef} from 'react'
import { Link } from 'react-router-dom'
import { albumsAPI, IFetchAlbumsResponse } from '../../services/albumsService'
import { motion } from 'framer-motion'
import styles from './Albums.module.scss'
import Card from '../Card'
import { Row, Col, Input } from 'antd'
import Logo from '../Logo'
import { IAlbum } from '../../models/types'
import useLazyLoading from '../../hooks/useLazyLoading'
import useSearch from '../../hooks/useSearch'

const Albums:React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [trigger, {data: albumsResponse, isFetching}, { lastArg }] = albumsAPI.useLazyFetchAlbumsQuery()
 
  const albums = useLazyLoading<IAlbum, IFetchAlbumsResponse>(
    {
      offset: 0,
      searchQuery: ''
    },
    albumsResponse?.albums,
    trigger,
    ref.current,
    isFetching,
    lastArg,
    albumsResponse?.albumsAmount ?? 0,
    2
  )

  const searchHandler = useSearch(
    {
      offset: 0,
      searchQuery: ''
    },
    trigger
  )

  return (
    <>
      <Input className='input mb-10' placeholder='Найти альбом' onChange={searchHandler}/>
      <div ref={ref} className='main-page-content-wrapper'>
        
        <div className={styles.albumsCards}>
          <Row style={{width: '100%'}} gutter={[10, 10]} >
            {albums.map((album, idx) => (
                <Col className='d-flex justify-center' key={album._id} span={24} md={{ span: 12}}>
                  <motion.div 
                    className={styles.albumsCard}
                    
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                    transition={{ duration: .15, delay: idx / 12, x: { ease: 'backOut'} }}
                  >
                    <Link to={`/album/${album._id}`}>
                      <Card image={album.thumbnail} title={album.name} subtitle={album.artist.name} size='large' />
                    </Link>
                  </motion.div>
                </Col>
              ))}
          </Row>
        </div> 
        {isFetching && <div className='d-flex justify-center'> <Logo size={40} animated={true}/> </div>}
      </div>
    </>
  )
}

export default Albums