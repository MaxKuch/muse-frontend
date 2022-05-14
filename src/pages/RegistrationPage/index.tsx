import { Button, Form, Input, notification } from 'antd'
import { authAPI } from '../../services/authService'
import { userSlice } from '../../store/reducers/userSlice'
import { useAppDispatch } from '../../hooks/redux'
import { IApiError } from '../../models/types'
import { useNavigate, Link } from 'react-router-dom'

interface FormValues {
  email: string;
  password: string;
  username?: string;
}

const RegistrationPage:React.FC = () => {
  const [registration, {isLoading}] = authAPI.useRegistrationMutation()
  const dispatch = useAppDispatch()
  const { setUser } = userSlice.actions
  const navigate = useNavigate()

  const submitHandler = async ({ email, password, username }: FormValues) => { 
    try {
      const {accessToken, user} = await registration({email, password, username}).unwrap()
      localStorage.setItem('token', accessToken)
      dispatch(setUser({user, accessToken}))
      notification.success({
        message: 'Успех',
      })
      navigate('/')
    } catch (error) {
      console.log(error)
      notification.error({
        message: (error as IApiError).data.message
      })
    }
  }

  return (
    <>
      <Form onFinish={submitHandler}>
        <h1 className='t-center mb-20'>Регистрация</h1>
        <Form.Item rules={[{required: true, message: 'Введите E-mail'}]} name='email' className='form-item'>
          <Input className='input' type='email' placeholder='Ваш E-mail'/>
        </Form.Item>
        <Form.Item name='username' className='form-item'>
          <Input className='input' placeholder='Ваше имя'/>
        </Form.Item>
        <Form.Item rules={[{required: true, message: 'Введите пароль'}]} name='password' className='form-item'>
          <Input type='password' className='input' placeholder='Пароль'/>
        </Form.Item>
        <div className='d-flex justify-center'><Button className='button' htmlType='submit' loading={isLoading}>Зарегистрироваться</Button></div>
      </Form>
      <p className='t-center mt-10'>Или <Link to='/auth/login'>войдите</Link></p>
    </>
  )
}

export default RegistrationPage