import React from 'react';
import { Card } from 'react-bootstrap';

export default function ListCard(props) {
  const { id, name, date_of_event, time_of_event } = props.data;
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {`${time_of_event} | ${date_of_event}`}
        </Card.Subtitle>
        <Card.Link href={`/events/${id}/view/`}>View</Card.Link>
        <Card.Link href={`/events/${id}/edit/`}>Update</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Body>
    </Card>
  );
}
