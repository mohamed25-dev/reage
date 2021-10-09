import './App.css';
import { useEffect } from 'react';
import Auth from './Auth';
import AppRoute from './AppRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, Home, Register, Profile } from './screens';

function App() {

  useEffect(() => {
    Auth.init();
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute exact path="/login" component={Login} />
          <AppRoute exact path="/register" component={Register} />
          <AppRoute exact path="/profile" component={Profile} can={Auth.auth} redirect='/login' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
