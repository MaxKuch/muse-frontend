import styles from './PlayButton.module.scss'
import { PlayIcon, PauseIcon, IconProps } from '../Icons'
import classNames from 'classnames'
import { IPlayButton } from '../../models/components'

interface VolumeIconProps extends IconProps {
    playing: boolean;
}

const Icon: React.FC<VolumeIconProps> = ({playing, ...props}) => {
    if(playing) return <PauseIcon {...props}/>
    else return <PlayIcon {...props}/>
}

const PlayButton:React.FC<IPlayButton> = ({ playing, onClick, extraClasses }) => {
    
    return (
        <button onClick={onClick} className={classNames([...extraClasses || [], styles.playButton, !playing ? styles.playButtonPlay : ''])}>
            <Icon className={styles.icon} playing={playing}/>
        </button>
    )
}

export default PlayButton