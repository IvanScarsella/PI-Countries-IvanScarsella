import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Create from './views/create/create.component';
import Detail from './views/home/home.component';
import Home from './views/home/home.component';
import Landing from './views/landing/landing.component'

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/landing" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/create" component={Create} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;