import React, { Component } from 'react';
import Dashboard from './Dashboard/Dashboard';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}
