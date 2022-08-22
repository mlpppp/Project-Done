import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import './App.css'
// components
import Header from './components/Header'
import Navbar from './components/Navbar'
import UserBar from './components/UserBar'

// pages
import HomePg from './pages/Home/HomePg'
import LoginPg from './pages/LoginPg'
import ProjectPg from './pages/Project/ProjectPg';
import CreatePrjPg from './pages/CreatePrjPg';
import SignupPg from './pages/SignupPg'

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady &&  
        <BrowserRouter>
          {user && <Navbar user={user}/>}
          <div className="body-container">
            <Header/>
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

              <Route exact path='/create'>
                {user && <CreatePrjPg/> }
                {!user && <Redirect to='/login'/> }
              </Route>

              <Route exact path='/projects/:id'>
                {user && <ProjectPg/> }
                {!user && <Redirect to='/login'/> }
              </Route>
              <Route path="*">   
                {user && <Redirect to='/'/> }
                {!user && <Redirect to='/login'/> }
              </Route>
            </Switch>
          </div>
          {user && <UserBar/>}
          {user && <div id="bar-cloud"></div> }
        </BrowserRouter>
      }
    </div>
  );
}

export default App
