import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserList from './components/UserList';
import User from './components/User';

function App() {
  return (
      <>
      <Router>
        <Switch>
        <Route exact path='/' component={UserList} />
        <Route exact path='/user/:id' component={User} />
        </Switch>
      </Router>
      </>
  );
}

export default App;
