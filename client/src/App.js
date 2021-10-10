import './App.css';
import { useEffect } from 'react';
import Auth from './Auth';
import AppRoute from './AppRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Login, Home, Register, Profile, UploadImage } from './screens';

function App() {

  useEffect(() => {
    Auth.init();
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute exact path="/upload" component={UploadImage} can={Auth.auth} redirect='/' />
          <AppRoute exact path="/login" component={Login} can={Auth.guest} redirect='/'/>
          <AppRoute exact path="/register" component={Register} can={Auth.guest} redirect='/'/>
          <AppRoute exact path="/profile" component={Profile} can={Auth.auth} redirect='/login' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
