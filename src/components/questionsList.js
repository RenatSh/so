import React from "react";
import { ListGroup, ListGroupItem, Col, Alert } from 'react-bootstrap';
import Loading from 'react-loading-animation';

import {getCallPromise} from '../stackexchangeApi.js';
import QuestionQiuckView from "../components/questionQiuckView.js";

function QuestionsListGroup(props) {
    const questions = props.items.map((item, index) => {
        return (
            <ListGroupItem key={index}>
                <QuestionQiuckView questionDetails={item}
                                   onAuthorClicked={props.onAuthorClicked} 
                                   onQuestionClicked={props.onQuestionClicked}
                                   onTagClicked={props.onTagClicked}  />
            </ListGroupItem>
        );
    });
    
    return (
            <ListGroup>
                {questions}
            </ListGroup>
    );
}

export default class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    
    this.render = this.render.bind(this);
    
    this.doHttpGet = this.doHttpGet.bind(this);
    this.state = {
        loading: true,
        error: null,
        items: null,
        more: null
    };
    this.doHttpGet(props.soQuestionsUrl);
  }
    
  doHttpGet(url) {
      
    if(url) {
        getCallPromise(url)
            .then(searchResult => {
                this.setState({
                    loading: false,
                    error: null,
                    items: searchResult.data.items,
                    more: searchResult.data.has_more
                });
            })
            .catch(failure => {
                this.setState({
                    loading: false,
                    error: failure || 'Unknown error',
                    items: null,
                    more: null
                });        
            }); 
    }        
  }
  
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.soQuestionsUrl !== this.props.soQuestionsUrl) {
        this.setState({
            loading: true,
            error: null,
            items: null,
            more: null
        });
        this.doHttpGet(nextProps.soQuestionsUrl);
    }
  }

  render() {
    if(!this.props.soQuestionsUrl) {
        return <div />;
    } else if(this.state.loading) {
        return <Loading />;        
    } else if (this.state.error) {
        return (
            <Alert bsStyle="danger">
                <h4>Failed to get {this.props.searchString} questions</h4>
                <p>{this.state.error.message || this.state.error.status || this.state.error}</p>
            </Alert>
        );
    } else if (!this.state.items 
               || this.state.items.length === 0) {
        return (
            <div> 
                No <b> {this.props.searchString} </b> questions found!
            </div>
        );
    } else {       
        const more = this.state.more ? <h1>...</h1> : ''
        
        return (
            <div>
                <QuestionsListGroup items={this.state.items} onAuthorClicked={this.props.onAuthorClicked}  onQuestionClicked={this.props.onQuestionClicked}  onTagClicked={this.props.onTagClicked} />
                {more}
            </div>
        );
    }
  }
}
