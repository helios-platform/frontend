import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SQLConsole from '../components/SQLConsole/SQLConsole';
import { IntegrationProvider } from '../contexts/IntegrationContext';
import queryService from '../api';
import '@testing-library/jest-dom';

vi.mock('../src/services/api', () => ({
  default: {
    listDatabases: vi.fn(),
    executeQuery: vi.fn(),
  },
}));

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
  beforeEach(() => {
    vi.resetAllMocks();
    
    vi.mocked(queryService.listDatabases).mockResolvedValue({
      default: ['table1', 'table2'],
    });
    vi.mocked(queryService.executeQuery).mockResolvedValue({
      cols: ['col1', 'col2'],
      rows: [['data1', 'data2']],
      row_count: 1,
    });
  });

  it('renders database and table selects', async () => {
    render(
      <IntegrationProvider>
        <SQLConsole />
      </IntegrationProvider>
    );
    expect(await screen.findByLabelText('Databases')).toBeInTheDocument();
    expect(await screen.findByLabelText('Tables')).toBeInTheDocument();
  });

  it('renders SQL query textarea', async () => {
    render(
      <IntegrationProvider>
        <SQLConsole />
      </IntegrationProvider>
    );
    expect(await screen.findByLabelText('SQL Queries')).toBeInTheDocument();
  });

  it('renders Run button', async () => {
    render(
      <IntegrationProvider>
        <SQLConsole />
      </IntegrationProvider>
    );
    expect(await screen.findByText('Run')).toBeInTheDocument();
  });
});