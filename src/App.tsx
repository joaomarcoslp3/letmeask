import { Home, NewRoom, Room } from './pages'
import { AuthContextProvider } from './providers'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './services/firebase'
import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/rooms/new'exact component={NewRoom} />
          <Route path='/rooms/:id' component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App
