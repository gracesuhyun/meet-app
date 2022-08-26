import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('render the NumberOfEvents component', () => {
    expect(NumberOfEventsWrapper).toHaveLength(1);
  });

  test('render the textbox label for number of events', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events label')).toHaveLength(1);
  })

  test('render input textbox to specify number of events', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events input')).toHaveLength(1);
  });

  test('render input textbox correctly', () => {
    const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.number-of-events input').prop('value')).toBe(numberOfEvents);
  });

  test('change state when input number changes', () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: "20",
    });
    const eventObject = { target: { value: '10' } };
    NumberOfEventsWrapper.find('.number-of-events input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
  });
})