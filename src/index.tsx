import React from 'react'
import { createRoot } from 'react-dom/client';
import './scss/index.scss'
import App from './App'
import { setupStore } from './store/store'
import { Provider } from 'react-redux'

const store = setupStore()

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <Provider store={store}><App /></Provider>
)
