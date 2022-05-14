import { Button, Form, Input, notification } from 'antd'
import { authAPI } from '../../services/authService'
import { userSlice } from '../../store/reducers/userSlice'
import { useAppDispatch } from '../../hooks/redux'
import { IApiError } from '../../models/types'
import { useNavigate, Link } from 'react-router-dom'

interface FormValues {
  email: string;
  password: string;
}

const LoginPage:React.FC = () => {
  const [login, {isLoading}] = authAPI.useLoginMutation()
  const dispatch = useAppDispatch()
  const { setUser } = userSlice.actions
  const navigate = useNavigate()

  const submitHandler = async ({ email, password }: FormValues) => { 
    try {
      const {accessToken, user} = await login({email, password}).unwrap()
      localStorage.setItem('token', accessToken)
      dispatch(setUser({user, accessToken}))
      notification.success({
        message: 'Успех'
      })
      navigate('/')
    } catch (error) {
      notification.error({
        message: (error as IApiError).data.message
      })
    }
  }

  return (
    <>
      <Form onFinish={submitHandler}>
        <h1 className='t-center mb-20'>Войти</h1>
        <Form.Item rules={[{required: true, message: 'Введите E-mail'}]} name='email' className='form-item'>
          <Input className='input' type='email' placeholder='Ваш E-mail'/>
        </Form.Item>
        <Form.Item rules={[{required: true, message: 'Введите пароль'}]} name='password' className='form-item'>
          <Input type='password' className='input' placeholder='Пароль'/>
        </Form.Item>
        <div className='d-flex justify-center'><Button className='button' htmlType='submit' loading={isLoading}>Войти</Button></div>
      </Form>
      <p className='t-center mt-10'>Или <Link to='/auth/registration'>зарегистрируйтесь</Link></p>
    </>
  )
}

export default LoginPage