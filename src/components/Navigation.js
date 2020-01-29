import React from 'react';
import { Navbar, Badge, Container } from 'react-bootstrap';

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Events App</Navbar.Brand>
        <Badge as="a" href="/events/create/" variant="primary" className="ml-auto p-2">
          Add Event
        </Badge>
      </Container>
    </Navbar>
  );
}
