import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { ListGroup, ListGroupItem, Grid } from 'react-bootstrap';
import Sidebar from "react-sidebar";

import {searchSOByTitleUrl, searchSOByUserUrl, searchSOByTagUrl} from '../stackexchangeApi.js';
import QuestionsList from "../components/questionsList.js";

class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);
    
    let params = queryString.parse(props.location.search);

    this.state = {  
        searchString: params.searchString,
        searchUrl: searchSOByTitleUrl(params.searchString),
        quickViewSearchString: null,
        quickViewSearchUrl: null
    };

    this.clickAuthor = this.clickAuthor.bind(this);
    this.clickTag = this.clickTag.bind(this);
    this.clickQuestion = this.clickQuestion.bind(this);
    this.render = this.render.bind(this);     
  }

  clickAuthor(user_id) {
    this.setState({
        quickViewSearchString: user_id,
        quickViewSearchUrl: searchSOByUserUrl(user_id)
    });
  }

  clickTag(tag) {
    this.setState({
        quickViewSearchString: tag,
        quickViewSearchUrl: searchSOByTagUrl(tag)
    });
  }

  clickQuestion(questionId) {
    this.props.history.push({
      pathname: '/question',
      search: '?questionId=' + questionId
    });
  }
  
  componentWillReceiveProps(nextProps) {
    let urlSearch = queryString.parse(nextProps.location.search);
    
    if (urlSearch.searchString !== this.state.searchString) {
      this.setState({ 
        searchString: urlSearch.searchString,
        searchUrl: searchSOByTitleUrl(urlSearch.searchString),
        quickViewSearchString: null,
        quickViewSearchUrl: null
      });
    }
  }

  render() {
        let mainQuestionsView = (<QuestionsList
                                    searchString={this.state.searchString} 
                                    soQuestionsUrl={this.state.searchUrl} 
                                    onAuthorClicked={this.clickAuthor} 
                                    onQuestionClicked={this.clickQuestion}
                                    onTagClicked={this.clickTag}/>);
      
        let quickViewOpened = !!this.state.quickViewSearchUrl;
            
        const sidebarstyles = {
          sidebar: {
            width: '50%'
          }
        };
        let quickView = (<div style={sidebarstyles}>
                           <QuestionsList
                            searchString={this.state.quickViewSearchString} 
                            soQuestionsUrl={this.state.quickViewSearchUrl} 
                            onAuthorClicked={this.clickAuthor} 
                            onQuestionClicked={this.clickQuestion}
                            onTagClicked={this.clickTag}/>
                         </div>);
                
        return (
            <Grid>                    
                <Sidebar
                    sidebar={quickView}
                    pullRight={true}
                    docked={quickViewOpened}
                    transitions={false}>
                  
                  {mainQuestionsView}
                </Sidebar>
            </Grid>
        );
  }
}

export default withRouter(QuestionsPage)