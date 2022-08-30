import { loadFeature, defineFeature } from 'jest-cucumber';

import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppWrapper;

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user hasn\'t opened the app yet', () => {
    });

    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the events should be collapsed by default', () => {
      expect(AppWrapper.find('.event-expanded')).toHaveLength(0);
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    given('the user is interested in an event', async () => {
      AppWrapper = await mount(<App />);
      expect(AppWrapper.find('.event-expanded')).toHaveLength(0);
    });

    when('the user clicks on the "show details" button on an event', () => {
      AppWrapper.update();
      AppWrapper.find('.details-button').at(0).simulate('click')
    });

    //ERROR received object is {} and 0 but should be 1
    then('the user should see the fully expanded details of the event', () => {
      expect(AppWrapper.find('.event-expanded')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the user is not interested in an event that has been expanded', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.details-button').at(0).simulate('click');
      expect(AppWrapper.find('.event-expanded')).toHaveLength(1);
    });

    when('the user clicks on the "hide details" button on an event', () => {
      AppWrapper.find('.details-button').at(0).simulate('click');
    });

    then('the event box should collapse', () => {
      expect(AppWrapper.find('.event-expanded')).toHaveLength(0);
    });
  });

});