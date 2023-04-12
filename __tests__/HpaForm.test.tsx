import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import HpaForm from '../components/HpaForm';

describe('HpaForm', () => {
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    render(<HpaForm onUpdate={mockOnUpdate} />);
  });

  afterEach(() => {
    mockOnUpdate.mockClear();
  });

  test('renders form elements', () => {
    expect(screen.getByLabelText(/hpa name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/minimum replicas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maximum replicas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/target cpu utilization percentage/i)).toBeInTheDocument();
    expect(screen.getByText(/update hpa/i)).toBeInTheDocument();
  });

  test('updates input values', () => {
    userEvent.type(screen.getByLabelText(/hpa name/i), 'test-hpa');
    userEvent.clear(screen.getByLabelText(/minimum replicas/i));
    userEvent.type(screen.getByLabelText(/minimum replicas/i), '2');
    userEvent.clear(screen.getByLabelText(/maximum replicas/i));
    userEvent.type(screen.getByLabelText(/maximum replicas/i), '10');
    userEvent.clear(screen.getByLabelText(/target cpu utilization percentage/i));
    userEvent.type(screen.getByLabelText(/target cpu utilization percentage/i), '70');

    expect(screen.getByLabelText(/hpa name/i)).toHaveValue('test-hpa');
    expect(screen.getByLabelText(/minimum replicas/i)).toHaveValue(2);
    expect(screen.getByLabelText(/maximum replicas/i)).toHaveValue(10);
    expect(screen.getByLabelText(/target cpu utilization percentage/i)).toHaveValue(70);
  });

  test('calls onUpdate with correct values', () => {
    userEvent.type(screen.getByLabelText(/hpa name/i), 'test-hpa');
    userEvent.clear(screen.getByLabelText(/minimum replicas/i));
    userEvent.type(screen.getByLabelText(/minimum replicas/i), '2');
    userEvent.clear(screen.getByLabelText(/maximum replicas/i));
    userEvent.type(screen.getByLabelText(/maximum replicas/i), '10');
    userEvent.clear(screen.getByLabelText(/target cpu utilization percentage/i));
    userEvent.type(screen.getByLabelText(/target cpu utilization percentage/i), '70');
    fireEvent.click(screen.getByText(/update hpa/i));

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith({
      hpaName: 'test-hpa',
      minReplicas: 2,
      maxReplicas: 10,
      targetCPUUtilizationPercentage: 70,
    });
  });
});
