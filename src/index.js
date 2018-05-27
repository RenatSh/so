import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Route,
  Link,
  HashRouter 
} from 'react-router-dom'

const title = 'My Minimal React Webpack Babel Setup';

const Home = () => (
    <div>
        <h1>Welcome home</h1>
        <Link to='/about'>Go to about</Link>
    </div>
);
const About = () => (
    <div>
        <h1>About</h1>
        <Link to='/'>Go home</Link>
    </div>
);

const Dummy = () => (
    <div>{title}</div>
);

class App extends React.Component {
  render() {
    return <HashRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
    </HashRouter>;
  }
}   
 
ReactDOM.render(
  <App />,
  document.getElementById('app')
);


module.hot.accept();