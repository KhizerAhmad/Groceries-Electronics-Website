import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './app/store'
import { makeServer } from './server.tsx'
import './index.css'

makeServer();
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <App />
  </Provider>
)
