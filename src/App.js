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
import Search from './pages/Search';

function App() {
  const { user, authIsReady } = useAuthContext()
  console.log(user);
  return (
    <div className="App">
      {authIsReady &&  
        <BrowserRouter>
          {user && <Navbar user={user}/>}
          <div className="body-container">
            <Header/>
            <Switch>
              <Route exact path='/'>
                {user && <HomePg useCompleted={false}/> }
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

              <Route exact path='/archive'>
                {user && <HomePg useCompleted={true}/> }
                {!user && <Redirect to='/login'/> }
              </Route>

              <Route exact path='/search'>
                {user && <Search/> }
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
