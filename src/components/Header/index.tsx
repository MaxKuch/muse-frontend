import styles from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Dropdown, Space } from 'antd'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/userSlice'
import { authAPI } from '../../services/authService'
import Logo from '../Logo'


const Header:React.FC = () => { 
    const [logout] = authAPI.useLogoutMutation()
    const { user, isAuth } = useAppSelector(store => store.userReducer)
    const { removeUser } = userSlice.actions
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const unautorize = () => { 
        localStorage.removeItem('token')
        logout('')
        dispatch(removeUser())
        navigate('/')
    }

    const menu = (
        <Menu className='dropdown'>
            <Menu.Item key={0}>
                <Link to='/favorites'>Избранное</Link>
            </Menu.Item>
            <Menu.Item key={1} onClick={unautorize}>
                Выйти
            </Menu.Item>
        </Menu>
    )
    
    return (
        <header className={styles.header}>
            <Link to='/'><Space className={styles.logo}><Logo size={35} /> Muse</Space></Link>
            <nav className={styles.menu}>
            
                <Link to='/upload' className={styles.menuItem}><UploadOutlined style={{fontSize: '20px'}} /></Link>
                {!isAuth && <Link to='/auth/login' className={styles.menuItem}><UserOutlined /></Link>}
                {isAuth && user && 
                    <Dropdown className={styles.menuItem} overlay={menu} trigger={['click']}>
                        <Space>
                            <UserOutlined />
                            {user.username}
                        </Space>
                    </Dropdown>
                }
            
            </nav>
        </header>
    )
}

export default Header