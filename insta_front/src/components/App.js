// import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Myposts from './Myposts'
import Signup from './Signup'
import Create from './Create'

function App(){
  return(
    <Router>
      <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/sign-up">
              <Signup />
          </Route>
          <Route path="/my-posts">
              <Myposts />
          </Route>
          <Route path="/post-create">
              <Create />
          </Route>
      </Switch>
  </Router>
  )
}

export default App;