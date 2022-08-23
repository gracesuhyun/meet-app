import React, { Component } from 'react';

class Event extends Component {
  state = {
    showDetails: false,
  };

  handleShowDetails = () => {
    if (this.state.showDetails === false) {
      this.setState({ showDetails: true });
    } else {
      this.setState({ showDetails: false });
    }
  };

  render() {
    const showDetails = this.state.showDetails;
    const { event } = this.props;

    return (
      <div className="event">
        <div className="event-summary">
          <h2>{event.summary}</h2>
          <p>{event.start.dateTime}</p>
          <p>{event.start.timeZone}</p>
          <p>@{event.summary} | {event.location}</p>
          {!showDetails && (
            <button 
              className="details-button"
              onClick={this.handleShowDetails}
            >
              Show Details
            </button>
          )}
          {showDetails && (
            <button 
              className="details-button"
              onClick={this.handleShowDetails}
            >
              Hide Details
            </button>
          )}
        </div>

        {showDetails && (
          <div className="expanded-details">
            <h3>About Event:</h3>
            <a href={event.htmlLink}
               target='_blank'
               rel='noopener noreferrer'
            >
              <button className="see-details">See details on Google Calendar</button>
            </a>
            <p>{event.description}</p>
          </div>
        )}
      </div>
    )
  }
}

export default Event;