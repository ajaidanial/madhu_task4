import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { ListCard } from '../components';

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsData: [],
      isFetched: false,
    };
  }

  componentDidMount() {
    axios.get('https://cryptic-refuge-20742.herokuapp.com/events/').then(response => {
      this.setState({
        eventsData: response.data,
        isFetched: true,
      });
    });
  }

  render() {
    const { isFetched, eventsData } = this.state;
    if (!isFetched) {
      return <h5>Fetching data...</h5>;
    }
    if (eventsData && eventsData.length > 0) {
      return (
        <Row>
          {eventsData.map(data => (
            <Col md={4} className="p-3">
              <ListCard key={data.id} data={data} />
            </Col>
          ))}
        </Row>
      );
    }
    return <h5>Nothing to show...</h5>;
  }
}
