import './App.css'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages
import HomePg from './pages/HomePg'
import LoginPg from './pages/LoginPg'
import ProjectPg from './pages/ProjectPg';
import SignupPg from './pages/SignupPg'

function App() {
  const { user, authIsReady } = useAuthContext()
  console.log(user)
  console.log(authIsReady)
  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              {user && <HomePg/> }
              {!user && <Redirect to='/login'/> }
            </Route>

            <Route exact path='/login'>
              {user && <Redirect to='/'/> }
              {!user && <LoginPg/> }
            </Route>

            <Route exact path='/signup'>
              {user && <Redirect to='/'/> }
              {!user && <SignupPg/> }
            </Route>
          </Switch>
        </BrowserRouter>
      }
    </div>
  );
}

export default App
