import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Route,
  Link,
  HashRouter 
} from 'react-router-dom';

import SearchPage from './pages/search.js';
import QuestionsPage from './pages/questions.js';
import AnswersPage from './pages/answers.js';
import { Grid } from 'react-bootstrap';


const title = 'SO search';

class App extends React.Component {
  render() {
    return (        
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
            <HashRouter>
                <div>
                    <Route exact path="/" component={SearchPage} />
                    <Route path="/results" component={QuestionsPage} />
                    <Route path="/question" component={AnswersPage} />
                </div>
            </HashRouter>
        </div>
    );
  }
}   
 
ReactDOM.render(
  <App />,
  document.getElementById('app')
);


//module.hot.accept();
