import {useEffect} from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useAppDispatch } from './hooks/redux'
import { userSlice } from './store/reducers/userSlice'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import MainPage from './pages/MainPage'
import Favorites from './pages/Favorites'
import ArtistPage from './pages/ArtistPage'
import AlbumPage from './pages/AlbumPage'
import UploadPage from './pages/UploadPage'
import { AudioContextProvider } from './components/AudioContext'

import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import { authAPI } from './services/authService'

function App() {
  const {data: user} = authAPI.useGetUserQuery('')
  const dispatch = useAppDispatch()
  const { setUser, setFavoriteSongs } = userSlice.actions

  useEffect(() => {
    if(user) {
      dispatch(setUser({user}))
      dispatch(setFavoriteSongs(user.favoriteSongs))
    }
  }, [user, dispatch, setUser, setFavoriteSongs])

  return (
    <div className="App">
        <AudioContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<MainPage/>}/>
                <Route path='favorites' element={<Favorites/>}/>
                <Route path='artist/:id' element={<ArtistPage/>}/>
                <Route path='album/:id' element={<AlbumPage/>}/>
                <Route path='upload' element={<UploadPage/>}/>
              </Route>
              <Route path='/auth' element={<AuthLayout/>}>
                <Route path='registration' element={<RegistrationPage />} />
                <Route path='login' element={<LoginPage />}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </AudioContextProvider>
    </div>
  );
}

export default App;
