import { AuthContextProvider } from './providers'
import { Home, NewRoom } from './pages'
import { BrowserRouter, Route } from 'react-router-dom'

import './services/firebase'
import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path='/' exact component={Home} />
        <Route path='/rooms/new' component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App
