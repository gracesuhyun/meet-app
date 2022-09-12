import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';

import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 20,
    tokenCheck: false,
    showWelcomeScreen: undefined,
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else(
      this.setState({ numberOfEvents: eventCount })
    )
    if (location === undefined) {
      location = this.state.locationSelected;
    }
    getEvents().then((events) => {
      const locationEvents = (location === 'all') 
          ? events 
          : events.filter((event) => event.location === location);
      this.setState({
          events: locationEvents.slice(0, eventCount),
          numberOfEvents: eventCount,
          locationSelected: location
      });
    });
  }

  async componentDidMount() {
    const accessToken = localStorage.getItem("access_token");
    const validToken = accessToken !== null  ? await checkToken(accessToken) : false;
    this.setState({ tokenCheck: validToken });
    if(validToken === true) this.updateEvents()
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.mounted = true;
    if (code && this.mounted === true && validToken === false){ 
      this.setState({tokenCheck:true });
      this.updateEvents()
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }
  
  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      
      <div className="App"> 
        <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents} />

        <NumberOfEvents 
          events={this.state.events}
          updateEvents={this.updateEvents} />

        {!navigator.onLine && <OfflineAlert text={'You are now offline. Using data from previous login.'} />} 
        
        <EventList 
          events={this.state.events} />

        <WelcomeScreen 
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />


      </div>
    );
  }
}

export default App;