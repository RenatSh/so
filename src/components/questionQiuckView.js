//Author, topic, amount of answers, tags
import React from "react";

import { Label, Glyphicon } from 'react-bootstrap';
import * as he from 'he';

class QuestionQiuckView extends React.Component {
    constructor(props) {
        super(props);
        
        if(this.props.onAuthorClicked) {
            this.onAuthorClicked = () => this.props.onAuthorClicked(this.props.questionDetails.owner.user_id);
        } else {
            this.onAuthorClicked = () => {};
        }
        
        if(this.props.onQuestionClicked) {
            this.onQuestionClicked = () => this.props.onQuestionClicked(this.props.questionDetails.question_id);
        } else {
            this.onQuestionClicked = () => {};            
        }
    }
    
    render() {        
        var authorStyle = {
            fontSize: 12,
            color: '#6a737c'
        };
        
        if(this.props.onAuthorClicked){
            authorStyle.cursor = 'pointer';
        }
        
        var pointerStyle = {
            cursor: 'pointer',
            marginRight: '5px'
        };
        
        if(this.props.onQuestionClicked){
            pointerStyle.cursor = 'pointer';
        }
        
        let tagStyle = {
            marginRight: '3px'
        };
        
        if(this.props.onTagClicked){
            tagStyle.cursor = 'pointer';
        }
        
        let questionDetails = this.props.questionDetails;
        
        let tags = questionDetails.tags &&
            questionDetails.tags.map((tag, index) => {
                if(this.props.onTagClicked) {
                    let onTagClicked = () => this.props.onTagClicked(tag);
                    return (
                        <Label bsStyle="info" style={tagStyle} key={index} onClick={onTagClicked}>{tag}</Label>
                    );
                } else {
                    return (
                        <Label bsStyle="info" style={tagStyle} key={index}>{tag}</Label>
                    );
                }                
            });
            
        let body = questionDetails.body &&
            (<div dangerouslySetInnerHTML={{__html: questionDetails.body}} />
            );
        
        return (
            <div>
                <div style={authorStyle} onClick={this.onAuthorClicked}> 
                    {he.decode(questionDetails.owner.display_name)} 
                </div>
                <div>
                    <h4 style={pointerStyle} onClick={this.onQuestionClicked}> {he.decode(questionDetails.title)} </h4>
                </div>
                <div>
                    {body}
                </div>
                <div> 
                    <span style={pointerStyle} onClick={this.onQuestionClicked}> 
                        <b>{questionDetails.answer_count}</b> answer(s)
                    </span>
                    <a href={questionDetails.link} target="_blank">
                        <Glyphicon glyph="link"/>
                    </a>
                </div>
                <div> 
                    {tags}
                </div>
            </div>
        )
    }
}

export default QuestionQiuckView;