import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre.js';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 20,
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

  getScatterData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return {city, number};
    })
    return data;
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false:true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ 
            events: events.slice(0, this.state.numberOfEvents), 
            locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }
  
  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    const { locations, numberOfEvents, events } = this.state;

    return (
      
      <div className="App"> 
      
        <h1>Meet App</h1>

        {!navigator.onLine && <OfflineAlert text={'You are now offline. Using data from previous login.'} />} 

        <CitySearch 
          locations={locations} 
          updateEvents={this.updateEvents} />
        <br/>
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          updateEvents={this.updateEvents} />
        <br/>

        <div className='data-vis-wrapper'>
          <EventGenre events={events} />
          
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type='category' dataKey='city' name='city' />
              <YAxis
                allowDecimals={false}
                type='number'
                dataKey='number'
                name='number of events'
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getScatterData()} fill='#8884d8' />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <h4>Events in each city</h4>
        <EventList 
          events={events} />

        <WelcomeScreen 
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />


      </div>
    );
  }
}

export default App;