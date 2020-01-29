import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {},
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

  onDelete = (e, id) => {
    e.preventDefault();
    axios
      .delete(`https://cryptic-refuge-20742.herokuapp.com/events/${id}/`)
      .then(response => {
        if (response.status === 204) {
          alert('Success');
          this.props.history.push(`/events/`);
        }
      })
      .catch(error => {
        alert('Error, check console.');
        console.log(error.response);
      });
  };

  render() {
    const { isFetched, eventData } = this.state;
    if (!isFetched) {
      return <h5>Fetching data...</h5>;
    }
    if (eventData && Object.keys(eventData).length > 0) {
      return (
        <Row>
          <Col md={12} className="p-3">
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>{eventData.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {`${eventData.time_of_event} | ${eventData.date_of_event} | ${eventData.venue}`}
                </Card.Subtitle>
                <Card.Text>{eventData.description}</Card.Text>
                <Card.Link href={`/events/${eventData.id}/edit/`}>Update</Card.Link>
                <Card.Link href="#" onClick={e => this.onDelete(e, eventData.id)}>
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    }
    return <h5>Nothing to show...</h5>;
  }
}
