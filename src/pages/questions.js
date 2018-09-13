import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Sidebar from "react-sidebar";
// import StickyBox from "react-sticky-box";

import {searchSOByTitlePromise, searchSOByUserPromise} from '../stackexchangeApi.js';
import QuestionsListAsync from "../components/questionsList.js";

// const Loading = require('react-loading-animation');
// import Loading from 'react-loading-animation';

class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(JSON.stringify(props));
    // let params = {
      // match: { path: "/results", url: "/results", isExact: true, params: {} },
      // location: { pathname: "/results", search: "?query=abc", hash: "" },
      // history: {
        // length: 8,
        // action: "PUSH",
        // location: { pathname: "/results", search: "?query=abc", hash: "" }
      // }
    // };
    let params = queryString.parse(props.location.search);

    this.state = { 
        // loading: true,
        // error: null,
        // items: null,
        // more: null,
        searchString: params.searchString,
        searchPromise: searchSOByTitlePromise(params.searchString),
        quickViewSearchString: null,
        quickViewSearchPromise: null
    };

    this.clickAuthor = this.clickAuthor.bind(this);
    this.clickTag = this.clickTag.bind(this);
    this.clickQuestion = this.clickQuestion.bind(this);
    this.render = this.render.bind(this);
    
    // searchSOByTitlePromise(params.searchString)
        // .then(response => response.json())
        // .then(searchResult => {
            // this.setState({
                // loading: false,
                // error: null,
                // items: searchResult.items,
                // more: searchResult.has_more,
                // searchString: this.state.searchString
            // });
        // })
        // .catch(failure => {
            // this.setState({
                // loading: false,
                // error: failure || 'Unknown error',
                // items: null,
                // more: null,
                // searchString: this.state.searchString
            // });        
        // });
  }

  clickAuthor(user_id) {
    console.log('clickAuthor(' + user_id + ')');
    this.setState({
        searchString: this.state.searchString,
        searchPromise: this.state.searchPromise,
        quickViewSearchString: user_id,
        quickViewSearchPromise: searchSOByUserPromise(user_id)
    });
    //this.setState({ searchString: event.target.value });
  }

  clickTag(event) {
    //this.setState({ searchString: event.target.value });
  }

  clickQuestion(event) {
    //this.setState({ searchString: event.target.value });
  }

  render() {
        let mainQuestionsView = (<QuestionsListAsync
                                    searchString={this.state.searchString} 
                                    promise={this.state.searchPromise} 
                                    onAuthorClicked={this.clickAuthor}/>);
      
        let quickViewOpened = !!this.state.quickViewSearchPromise;
        console.log('@questions.js ... quickViewOpened :' + quickViewOpened);
      
        if(quickViewOpened) {
            console.log('@questions.js ... render :' + JSON.stringify(this.state.quickViewSearchPromise));
            let quickView = (<QuestionsListAsync
                                searchString={this.state.quickViewSearchString} 
                                promise={this.state.quickViewSearchPromise} 
                                onAuthorClicked={this.clickAuthor}/>);
                    
            return (
                <div>                    
                    <Sidebar
                        sidebar={quickView}
                        pullRight={true}
                        docked={quickViewOpened}>
                      
                      {mainQuestionsView}
                    </Sidebar>
                </div>
            );    
        } else {
            return (
                <div>                    
                    {mainQuestionsView}
                </div>
            );    
        }
  }
}

export default withRouter(QuestionsPage)