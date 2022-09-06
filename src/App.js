import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 20,
    showWelcomeScreen: undefined
  }

  updateEvents = (location, eventCount) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === 'all'
          ? events
          : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          currentLocation === 'all'
          ? events
          : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      });
    }
  };
  
  render() {
    if (this.state.showWelcomeScreen === undefined) 
    return <div className='App'/>

    return (
      <div className="App"> 
        <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents} />

        <NumberOfEvents 
          events={this.state.events}
          updateEvents={this.updateEvents} />
        
        <EventList 
          events={this.state.events} 
          updateEvents={this.updateEvents}/>

        {!navigator.onLine && <OfflineAlert text={'You are now offline. Using data from previous login.'} />}
        
        <WelcomeScreen 
          showWelcomeScreen={this.state.showWelcomeScreen} 
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }

  async componentDidMount() {
    this.mounted = true;

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

}

export default App;