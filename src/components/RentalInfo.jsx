import React, { Component } from 'react';
import InfoTable from './InfoTable';
import { withRouter } from 'react-router-dom';

class RentalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      infoUprocessed: []
    }
    this.componentDidMount();
    this.info = this.info.bind(this)
  }

  componentDidMount() {
    this.info(this);
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async info() {
    const response = await fetch('/rental-info/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    var body;
    try {
      body = await response.json();
      this.setState({ infoUprocessed: body });
      this.state.info = [];
      this.state.infoUprocessed.map(info =>
        this.state.info.push(info.split("; "))
      );
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="RentalInfo">
        <InfoTable info={this.state.info} />
      </div>
    );
  }
}
export default withRouter(RentalInfo);