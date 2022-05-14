import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { artistsAPI, IFetchArtistsResponse } from '../../services/artistsService'
import { motion } from 'framer-motion'
import styles from './Artists.module.scss'
import Card from '../Card'
import { Row, Col, Input } from 'antd'
import Logo from '../Logo'
import { IArtist } from '../../models/types'
import useLazyLoading from '../../hooks/useLazyLoading'
import useSearch from '../../hooks/useSearch'

const Authors:React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [trigger, {data: artistsResponse, isFetching}, { lastArg }] = artistsAPI.useLazyFetchArtistsQuery()
 
  const artists = useLazyLoading<IArtist, IFetchArtistsResponse>(
    {
      offset: 0,
      searchQuery: ''
    },
    artistsResponse?.artists,
    trigger,
    ref.current,
    isFetching,
    lastArg,
    artistsResponse?.artistsAmount ?? 0,
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
      <Input className='input mb-10' placeholder='Найти исполнителя' onChange={searchHandler}/>
      <div ref={ref} className='main-page-content-wrapper'>
        <div className={styles.artistsCards}>
          <Row style={{width: '100%'}} gutter={[10, 10]} >
            {artists.map((artist, idx) => (
              <Col className='d-flex justify-center' key={artist._id} span={24} md={{ span: 12}}>
                <motion.div 
                  className={styles.artistsCard}
                  key={artist._id}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                  transition={{ duration: .15, delay: idx / 12, x: { ease: 'backOut'} }}
                >
                  <Link to={`/artist/${artist._id}`}>
                    <Card image={artist.thumbnail} title={artist.name} size='large' />
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

export default Authors