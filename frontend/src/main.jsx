import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import ToastifyContainer from './components/common/ToastifyContainer.jsx'
import {rootReducer} from "./store.js"
const store = createStore(rootReducer)
createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store} >
    <ToastifyContainer />
      <App />
      </Provider>
    </>
)
