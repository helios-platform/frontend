import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SQLConsole from '../src/components/SQLConsole';
import { IntegrationProvider } from '../src/contexts/IntegrationContext';
import React from 'react';

// Mock the useLocation hook
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/sql-dashboard',
    search: '',
    hash: '',
    state: null,
  }),
}));

describe('SQLConsole', () => {
  it('renders database and table selects', () => {
    render(
      <IntegrationProvider>
        <SQLConsole />
      </IntegrationProvider>
    );
    expect(screen.getByLabelText('Databases')).toBeInTheDocument();
    expect(screen.getByLabelText('Tables')).toBeInTheDocument();
  });

  it('renders SQL query textarea', () => {
    render(
      <IntegrationProvider>
        <SQLConsole />
      </IntegrationProvider>
    );
    expect(screen.getByLabelText('SQL Queries')).toBeInTheDocument();
  });

  it('renders Run button', () => {
    render(
      <IntegrationProvider>
        <SQLConsole />
      </IntegrationProvider>
    );
    expect(screen.getByText('Run')).toBeInTheDocument();
  });
});