import React from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchString: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchString: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.searchString);
    this.props.history.push({
      pathname: '/results',
      search: '?searchString=' + this.state.searchString
      // state: { detail: response.data }
    });
    event.preventDefault();
  }

  render() {
    return (
    <Col md={12}>
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                SO search:
            </Col>
            <Col sm={8}>
                <FormControl type="text" value={this.state.searchString} placeholder="Any keyword..." onChange={this.handleChange} />
            </Col>
            <Col sm={2}>
                <Button type="submit" bsStyle="primary">
                    Search
                </Button>
            </Col>
        </FormGroup>
      </Form>
    </Col>
    );
  }    
}
