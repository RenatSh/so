import React from "react";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Loading from 'react-loading-animation';

import {searchSOByTitlePromise, searchSOByUserPromise} from '../stackexchangeApi.js';
import QuestionQiuckView from "../components/questionQiuckView.js";

export default class QuestionsListAsync extends React.Component {
  constructor(props) {
    super(props);
    
    this.clickQuestion = this.clickQuestion.bind(this);
    // this.clickAuthor = this.clickAuthor.bind(this);
    // this.clickTag = this.clickTag.bind(this);
    this.render = this.render.bind(this);
    
    this.state = {
        loading: true,
        error: null,
        items: null,
        more: null,
        searchString: props.searchString,
        onAuthorClicked: props.onAuthorClicked
    };
    
    console.log('QuestionsListAsync... props.promise == ' + JSON.stringify(props.promise));
    
    props.promise
        //.then(response => response.json())
        .then(searchResult => {
            console.log('got: ' + this.state.searchString);
            this.setState({
                loading: false,
                error: null,
                items: searchResult.data.items,
                more: searchResult.data.has_more,
                searchString: this.state.searchString,
                onAuthorClicked: this.state.onAuthorClicked
            });
        })
        .catch(failure => {
            console.log('failed: ' + this.state.searchString + " " + failure);
            this.setState({
                loading: false,
                error: failure || 'Unknown error',
                items: null,
                more: null,
                searchString: this.state.searchString,
                onAuthorClicked: this.state.onAuthorClicked
            });        
        });    
  }

  // clickAuthor(user_id) {
    // //this.setState({ searchString: event.target.value });
  // }

  // clickTag(event) {
    // //this.setState({ searchString: event.target.value });
  // }

  clickQuestion(event) {
    //this.setState({ searchString: event.target.value });
  }

  render() {
    if(this.state.loading) {
        return <Loading />;
    } else if (!this.state.items 
               || this.state.items.length === 0) {
        return (
            <div> 
                No <b> {this.state.searchString} </b> questions found!
            </div>
        );
    } else {        
        const questions = this.state.items.map((item, index) => {
            return (
                <ListGroupItem key={index}>
                    <QuestionQiuckView questionDetails={item} onAuthorClicked={this.state.onAuthorClicked} />
                </ListGroupItem>
            );
        });
        
        const more = this.state.more ? <h1>...</h1> : ''
        
        return (
            <div>
                <ListGroup>
                    {questions}
                </ListGroup>
                {more}
            </div>
        );
    }
  }
}
