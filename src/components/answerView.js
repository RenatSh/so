//Author, topic, amount of answers, tags
import React from "react";

import { Col, Row, Glyphicon, Grid } from 'react-bootstrap';
import * as he from 'he';

class AnswerView extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {        
        let authorStyle = {
            fontSize: 12,
            color: '#6a737c',
            marginTop: '10px',
        };
        
        let rowStyle = {
            paddingBottom: '15px',
            marginTop: '10px',
            borderTop: '1px solid #e4e6e8'
        };
        
        let acceptedAnswerStyle = {
            color: 'green'
        };
        
        let questionDetails = this.props.questionDetails;
            
        let acceptedAnswer = (questionDetails.is_accepted === true) &&
            ( <Row>
                 <Col sm={1} style={acceptedAnswerStyle} componentClass="h4">
                    <Glyphicon glyph="ok"/>
                 </Col>
              </Row>
            );
            
        return (
            <Row style={rowStyle}>
                <Col sm={1}>
                    <Row>
                        <Col sm={1}>
                            <h4>{questionDetails.score}</h4>
                        </Col>
                    </Row>
                    {acceptedAnswer}
                </Col>
                <Col sm={11}>
                    <Row>
                        <Col>
                            <div dangerouslySetInnerHTML={{__html: questionDetails.body}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={authorStyle}> 
                                {he.decode(questionDetails.owner.display_name)} 
                            </div>
                        </Col>
                    </Row>
                </Col>                
            </Row>
        )
    }
}

export default AnswerView;