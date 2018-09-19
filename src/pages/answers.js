import React from 'react';
import { ListGroup, ListGroupItem, Col, Grid, Alert } from 'react-bootstrap';
import Loading from 'react-loading-animation';
import queryString from "query-string";

import {getSOAnswersUrl, getSOQuestionUrl, getCallPromise} from '../stackexchangeApi.js';
import AnswerView from "../components/answerView.js";
import QuestionQiuckView from "../components/questionQiuckView.js";

function AnswersListGroup(props) {
    const questions = props.items.map((item, index) => {
        return (
            <AnswerView key={index} questionDetails={item} />
        );
    });
    
    return (
            <div>
                {questions}
            </div>
    );
}

export default class AnswersPage extends React.Component {
  constructor(props) {
    super(props);
    
    let params = queryString.parse(props.location.search);
    let answersUrl = getSOAnswersUrl(params.questionId);
    let questionUrl = getSOQuestionUrl(params.questionId);
    
    this.state = {
        loading: true,
        questionId: params.questionId
    };
    
    let promises = [
        getCallPromise(answersUrl)
            .then(result => {
                this.setState({
                    error1: null,
                    answers: result.data.items
                });
            })
            .catch(failure => {
                this.setState({
                    error1: failure || 'Unknown error',
                    answers: null
                });        
            }),
            
        getCallPromise(questionUrl)
            .then(result => {
                this.setState({
                    error2: null,
                    question: result.data.items[0]
                });
            })
            .catch(failure => {
                this.setState({
                    error2: failure || 'Unknown error',
                    question: null,
                });        
            })
    ];
    
    Promise.all(promises).then( _ => {
        this.setState({
            loading: false
        });        
    }).catch( err => {
        this.setState({
            loading: false,
            error1: err
        });        
    });
  }

  render() {
    if(this.state.loading) {
        return <Loading />;
    } else if (this.state.error1
            || this.state.error2) {
        return (
            <Alert bsStyle="danger">
                <h4>Failed to get {this.state.questionId} question</h4>
                <p>{this.state.error1.message || this.state.error1.status || this.state.error1}</p>
                <p>{this.state.error2.message || this.state.error2.status || this.state.error2}</p>
            </Alert>
        );
    } else {
        return ( 
            <Grid>
                <QuestionQiuckView questionDetails={this.state.question} />
                <AnswersListGroup items={this.state.answers} />
            </Grid>
        );
    }
  }    
}
