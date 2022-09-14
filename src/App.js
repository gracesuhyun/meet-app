import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie
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
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  }

  getPieData = () => {
    const { events } = this.state;
    const genres = ['React', 'AngularJS', 'jQuery', 'Node', 'JavaScript']
    const data = genres.map((genre)=>{
      const value = events.filter((event) => event.summary.includes(genre)).length;
      return { 'name': genre, value }; 
    });
    return data.filter(item => item.value > 0);
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

        <CitySearch 
          locations={locations} 
          updateEvents={this.updateEvents} />
        <br/>
        <NumberOfEvents 
          // events={this.state.events}
          numberOfEvents={numberOfEvents}
          updateEvents={this.updateEvents} />

        {!navigator.onLine && <OfflineAlert text={'You are now offline. Using data from previous login.'} />} 
        
        <div className='pie-chart'>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={this.getPieData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name }) => `${name}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
            </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='scatter-chart'>
          <ResponsiveContainer height={400} >
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getScatterData()} fill="#8884d8" />
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