import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, Home, Register } from './screens';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
