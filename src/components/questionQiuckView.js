//Author, topic, amount of answers, tags
import React from "react";

import { Label } from 'react-bootstrap';
import * as he from 'he';

// const QuestionQiuckView = ({name}) => (
 // <div>{`Hi ${name}`}</div>
// );

//    {
//      "tags": [
//        "azure"
//      ],
//      "owner": {
//        "reputation": 709,
//        "user_id": 2446435,
//        "user_type": "registered",
//        "accept_rate": 43,
//        "profile_image": "https://i.stack.imgur.com/eSKl7.jpg?s=128&g=1",
//        "display_name": "Devin Gleason Lambert",
//        "link": "https://stackoverflow.com/users/2446435/devin-gleason-lambert"
//      },
//      "is_answered": false,
//      "view_count": 24,
//      "answer_count": 0,
//      "score": 0,
//      "last_activity_date": 1514476418,
//      "creation_date": 1514476418,
//      "question_id": 48010464,
//      "link": "https://stackoverflow.com/questions/48010464/how-to-methodically-govern-azure-load-balancer-routing-on-a-http-request",
//      "title": "How to methodically govern Azure Load Balancer routing on a Http request?"
//    }

function unescapeSingleQuote(str) {
  return (str || '').replace('&#39;',"'");
}

class QuestionQiuckView extends React.Component {
    constructor(props) {
        super(props);
        this.onAuthorClicked = () => this.props.onAuthorClicked(this.props.questionDetails.owner.user_id);
    }
    
    render() {        
        let authorStyle = {
            fontSize: 12,
            color: '#6a737c',            
            cursor: 'pointer'
        };
        
        let tagStyle = {
            marginRight: '3px'
        };
        
        let questionDetails = this.props.questionDetails;
        
        let tags = questionDetails.tags &&
            questionDetails.tags.map((tag, index) => (
                <Label bsStyle="info" style={tagStyle} key={index}>{tag}</Label>
            ));
        
        return (
            <div key={this.props.key}>
                <div style={authorStyle} onClick={this.onAuthorClicked}> 
                    {he.decode(questionDetails.owner.display_name)} 
                </div>
                <h4> {he.decode(questionDetails.title)} </h4>
                <div> 
                    <b>{questionDetails.answer_count}</b> answer(s)
                </div>
                <div> 
                    {tags}
                </div>
            </div>
        )
    }
}

export default QuestionQiuckView;