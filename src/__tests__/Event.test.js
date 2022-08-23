import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]} />);
  });

  test ('render the Event component', () => {
    expect(EventWrapper).toHaveLength(1);
  });

  test('render the event container div', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test("display only the event summary", () => {
    expect(EventWrapper.find(".event").children()).toHaveLength(1);
  });

  test('render the event summary container div', () => {
    expect(EventWrapper.find('.event-summary')).toHaveLength(1);
  });

  test('render the event summary contents', () => {
    expect(EventWrapper.find('.event-summary').children()).toHaveLength(5);
  });

  test ('render the details button', () => {
    expect(EventWrapper.find('.details-button')).toHaveLength(1);
  });

  test('click show details button to reveal all event details', () => {
    EventWrapper.setState({ showDetails: false });
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(true);
  });

  test('render the event details', () => {
    EventWrapper.setState({ showDetails: true });
    expect(EventWrapper.find('.expanded-details')).toHaveLength(1);
  });

  test('click hide details button to hide all event details', () => {
    EventWrapper.setState({ showDetails: true });
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(false);
  });
})