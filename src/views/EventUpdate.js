import React, { Component } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import axios from 'axios';

export default class EventUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {
        name: '',
        description: '',
        venue: '',
        date_of_event: '',
        time_of_event: '',
      },
      isFetched: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`https://cryptic-refuge-20742.herokuapp.com/events/${id}/`).then(response => {
      this.setState({
        eventData: response.data,
        isFetched: true,
      });
    });
  }

  onChangeInput = event => {
    this.setState({
      ...this.state,
      eventData: {
        ...this.state.eventData,
        [event.target.name]: event.target.value,
      },
    });
  };

  updateEvent = (event, id) => {
    event.preventDefault();
    axios
      .patch(`https://cryptic-refuge-20742.herokuapp.com/events/${id}/`, this.state.eventData)
      .then(response => {
        if (response.status === 200) {
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
    const { name, description, venue, time_of_event, date_of_event, id } = this.state.eventData;
    if (!this.state.isFetched) return <h5>Fetching data...</h5>;
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
              <Card.Link href="#" onClick={event => this.updateEvent(event, id)}>
                Save
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}
