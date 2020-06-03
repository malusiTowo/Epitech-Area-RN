import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../src/screens/Home';

it('Home renders correctly', () => {
  const home = renderer.create(<Home />).toJSON();
  expect(home).toMatchSnapshot();
});
