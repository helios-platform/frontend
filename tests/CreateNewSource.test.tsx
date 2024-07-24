import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateNewSource from '../src/components/createDataSource/CreateNewSource';
import { IntegrationProvider } from '../src/contexts/IntegrationContext';
import { StreamProvider } from '../src/contexts/StreamContext';
import { FinalizedSchemaProvider } from '../src/contexts/FinalizedSchemaContext';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';


const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <IntegrationProvider>
        <StreamProvider>
          <FinalizedSchemaProvider inferredSchema={[]}>
            {ui}
          </FinalizedSchemaProvider>
        </StreamProvider>
      </IntegrationProvider>
    </BrowserRouter>
  );
};

describe('CreateNewSource', () => {
  it('renders the first step', () => {
    renderWithProviders(<CreateNewSource />);
    expect(screen.getByText('Select the data source')).toBeInTheDocument();
  });

  it('displays Amazon Kinesis as an option', () => {
    renderWithProviders(<CreateNewSource />);
    expect(screen.getByText('Amazon Kinesis')).toBeInTheDocument();
  });

  it('displays Amazon S3 as an option', () => {
    renderWithProviders(<CreateNewSource />);
    expect(screen.getByText('Amazon S3')).toBeInTheDocument();
  });

  it('moves to the next step when a source is selected', async () => {
    renderWithProviders(<CreateNewSource />);
    await userEvent.click(screen.getByText('Amazon Kinesis'));
    expect(await screen.findByText('Setup Connection')).toBeInTheDocument();
  });

  it('allows input of access key and secret key', async () => {
    renderWithProviders(<CreateNewSource />);
    await userEvent.click(screen.getByText('Amazon Kinesis'));
    
    const accessKeyInput = await screen.findByLabelText('IAM Access Key');
    const secretKeyInput = await screen.findByLabelText('IAM Secret');
    
    await userEvent.type(accessKeyInput, 'testAccessKey');
    await userEvent.type(secretKeyInput, 'testSecretKey');
    
    expect(accessKeyInput).toHaveValue('testAccessKey');
    expect(secretKeyInput).toHaveValue('testSecretKey');
  });
});