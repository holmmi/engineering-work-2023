import ReactDOM from 'react-dom/client'
import './services/translation/i18n'
import '@fontsource-variable/lexend'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
