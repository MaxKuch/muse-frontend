import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import styles from './AuthLayout.module.scss'

const AuthLayout:React.FC = () => {
  return (
    <div className={styles.container}>
        <Header />
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}><Outlet/></div>
        </div>
    </div>
  )
}

export default AuthLayout