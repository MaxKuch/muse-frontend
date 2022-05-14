import { useState } from 'react'
import { Steps } from 'antd'
import styles from './UploadPage.module.scss'
import UploadArtist from '../../components/UploadArtist'
import UploadAlbum from '../../components/UploadAlbum'
import UploadSong from '../../components/UploadSong'
import { useNavigate } from 'react-router-dom'

const { Step } = Steps

const UploadPage:React.FC = () => {
    const navigate = useNavigate() 
    const [progress, setProgress] = useState(0)
    const [artist, setArtist] = useState<string>()
    const [album, setAlbum] = useState<string>()

    const steps = [
      <UploadArtist onChange={setArtist} next={() => setProgress(progress+1)}/>, 
      <UploadAlbum onChange={setAlbum} next={() => setProgress(progress+1)} artist={artist || ''} />,
      <UploadSong artist={artist || ''} album={album || ''} next={() => navigate('/')}/>
    ]

    return (
      <div className={styles.upload}>
          <Steps current={progress} responsive={false} labelPlacement={'vertical'}>
            <Step title='Исполнитель'/>
            <Step title='Альбом'/>
            <Step title='Песня'/>
          </Steps>
          <div className={styles.uploadBody}>
            {steps[progress]}
          </div>
      </div>
    )
}

export default UploadPage