import React, { Component } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import axios from 'axios';

export default class EventCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      venue: '',
      date_of_event: '',
      time_of_event: '',
    };
  }

  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  createEvent = event => {
    event.preventDefault();
    axios
      .post('https://cryptic-refuge-20742.herokuapp.com/events/', this.state)
      .then(response => {
        if (response.status === 201) {
          alert('Success');
          this.props.history.push(`/events/${response.data.id}/view/`);
        }
      })
      .catch(error => {
        alert('Error, check console.');
        console.log(error.response);
      });
  };

  render() {
    const { name, description, venue, time_of_event, date_of_event } = this.state;
    return (
      <Row>
        <Col md={12} className="p-3">
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Form.Control
                placeholder="Name"
                value={name}
                name="name"
                onChange={this.onChangeInput}
              />
              <Row>
                <Col className="mt-3" md>
                  <Form.Control
                    placeholder="Time | __:__:__"
                    value={time_of_event}
                    name="time_of_event"
                    onChange={this.onChangeInput}
                  />
                </Col>
                <Col className="mt-3" md>
                  <Form.Control
                    placeholder="Date | YYYY-MM-DD"
                    value={date_of_event}
                    name="date_of_event"
                    onChange={this.onChangeInput}
                  />
                </Col>
                <Col className="mt-3" md>
                  <Form.Control
                    placeholder="Venue"
                    value={venue}
                    name="venue"
                    onChange={this.onChangeInput}
                  />
                </Col>
              </Row>
              <Form.Control
                className="my-3"
                as="textarea"
                rows="5"
                placeholder="Description"
                value={description}
                name="description"
                onChange={this.onChangeInput}
              />
              <Card.Link href="/events/">Cancel</Card.Link>
              <Card.Link href="#" onClick={this.createEvent}>
                Save
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}
