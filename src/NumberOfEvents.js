import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 20,
  }

  handleInputChanged = (event) => {
    let newInput = parseInt(event.target.value);
    if ((newInput > 33) || (newInput < 1)) {
      this.setState({
        numberOfEvents: newInput,
        infoText: 'Please choose a number between 1 and 20',
      })
    } else {
      this.setState({
        numberOfEvents: newInput,
        infoText: ' ',
      })
    }
        this.props.updateEvents(undefined, newInput);
  }

  render() {
    return (
      <div className="number-of-events">

        <label>Number of Events Per Page:</label>
        <input 
          className="inputNumberOfEvents"
          type="number"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />

      </div>
    )
  }
}

export default NumberOfEvents;