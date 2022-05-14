import styles from './MainLayout.module.scss'
import Header from '../../components/Header'
import {  Outlet } from 'react-router-dom'
import Player from '../../components/Player'
import { useAudioContext } from '../../components/AudioContext'

const MainLayout:React.FC = () => {
    const { currentSong } = useAudioContext() 
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <Outlet />
            </div>
            {currentSong && <div className={styles.player}>
                <Player/>
            </div>}
        </div>
    )
}

export default MainLayout