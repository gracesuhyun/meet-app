import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: 'white',
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#0000FF';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
      this.color = '#990200';
  }
}

class OfflineAlert extends Alert {
  constructor(props) {
      super(props);
      this.color = 'orange';
  }
}

export { InfoAlert, ErrorAlert, OfflineAlert };