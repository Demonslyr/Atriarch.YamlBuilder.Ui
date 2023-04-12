import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ServiceForm from '../components/ServiceForm';

describe('ServiceForm', () => {
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    render(<ServiceForm onUpdate={mockOnUpdate} />);
  });

  afterEach(() => {
    mockOnUpdate.mockClear();
  });

  test('renders form elements', () => {
    expect(screen.getByLabelText(/service name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/selector/i)).toBeInTheDocument();
    expect(screen.getByText(/add selector/i)).toBeInTheDocument();
    expect(screen.getByText(/add port/i)).toBeInTheDocument();
    expect(screen.getByText(/update service/i)).toBeInTheDocument();
  });

  test('updates form values', () => {
    userEvent.type(screen.getByLabelText(/service name/i), 'test-service');
    userEvent.selectOptions(screen.getByLabelText(/service type/i), 'NodePort');
    userEvent.type(screen.getByLabelText(/selector/i), 'app=my-app');
    fireEvent.click(screen.getByText(/add selector/i));

    expect(screen.getByLabelText(/service name/i)).toHaveValue('test-service');
    expect(screen.getByLabelText(/service type/i)).toHaveValue('NodePort');
    expect(screen.getByText('app: my-app')).toBeInTheDocument();
  });

  test('calls onUpdate with correct values', () => {
    userEvent.type(screen.getByLabelText(/service name/i), 'test-service');
    userEvent.selectOptions(screen.getByLabelText(/service type/i), 'NodePort');
    userEvent.type(screen.getByPlaceholderText('Key'), 'app');
    userEvent.type(screen.getByPlaceholderText('Value'), 'my-app');
    fireEvent.click(screen.getByText(/add selector/i));

    userEvent.type(screen.getByPlaceholderText('Port'), '80');
    userEvent.type(screen.getByPlaceholderText('Target Port'), '9376');
    userEvent.selectOptions(screen.getByDisplayValue('TCP'), 'UDP');
    fireEvent.click(screen.getByText(/add port/i));

    fireEvent.click(screen.getByText(/update service/i));

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith({
      serviceName: 'test-service',
      serviceType: 'NodePort',
      selector: { app: 'my-app' },
      ports: [{ port: 80, targetPort: 9376, protocol: 'UDP' }],
    });
  });
});
