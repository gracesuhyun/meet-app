import { loadFeature, defineFeature } from 'jest-cucumber';

import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppWrapper;

  test('When user hasn\'t specified a number, 20 is the default number', ({ given, when, then }) => {
    given('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    when('the user doesn\'t specify how any events to view per page', () => {
    });

    then('the user should only see 20 events at once', () => {
      expect(AppWrapper.state('numberOfEvents')).toEqual(20);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('the user opens the app and wants to see more or fewer events in the list', () => {
      AppWrapper = mount(<App />);
    });

    when('the user enters the desired number of events to view per page in the "number of events" textbox', () => {
      AppWrapper.find('.inputNumberOfEvents').simulate('change', { target:{ value: 5 }});
    });

    then('the default number of events per page should change to what the the user chose', () => {

      expect(AppWrapper.state('numberOfEvents')).toEqual(5);
    });
  });
});