import { ICard } from '../../models/components'
import styles from './Card.module.scss'
import { PlayIcon } from '../Icons'

const Card:React.FC<ICard> = ({ size, title, subtitle, image }) => {
    const sizes = {
        small: 200,
        large: 300
    }

    return (
        <div className={styles.card} style={{ backgroundImage: `url('${image}'`, '--size': `${sizes[size]}px` } as React.CSSProperties}>
            <div className={styles.cardOverlay}><PlayIcon className={styles.playIcon} /></div>
            <h4>{title || ''}</h4>
            <h5>{subtitle || ''}</h5>
        </div>
    )
}

export default Card