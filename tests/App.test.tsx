import { expect, test } from 'vitest'
import { screen, render } from '@testing-library/react';
import App from '../src/App';
import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";


test('React router: expect SQL Dashboard to be in document', () => {
  
  render(<Router> <App /> </Router>);
  expect(screen.getByText('SQL Dashboard'))
})









