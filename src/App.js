import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { EventCreate, EventList, EventUpdate, EventDetail } from './views';
import { Navigation } from './components';

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* navigation */}
        <Navigation />
        {/* other pages */}
        <Container className="py-4">
          <Switch>
            <Route path="/events/create" component={EventCreate} />
            <Route path="/events/:id/edit" component={EventUpdate} />
            <Route path={['/events/:id/view', '/events/:id']} component={EventDetail} />
            <Route path={['/events', '/']} component={EventList} />
          </Switch>
        </Container>
      </Router>
    );
  }
}
