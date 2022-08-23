import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 20,
  }

  handleInputChanged = (event) => {
    this.setState({
        numberOfEvents: event.target.value
    });
}

  render() {
    return (
      <div className="number-of-events">

        <label>Number of Events Per Page:</label>
        <input 
          type="number"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />

      </div>
    )
  }
}

export default NumberOfEvents;