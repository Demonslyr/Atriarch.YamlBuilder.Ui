import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import IngressForm from '../components/IngressForm';

describe('IngressForm', () => {
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    render(<IngressForm onUpdate={mockOnUpdate} />);
  });

  afterEach(() => {
    mockOnUpdate.mockClear();
  });

  test('renders form elements', () => {
    expect(screen.getByLabelText(/ingress name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/host/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/path/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/service name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/service port/i)).toBeInTheDocument();
    expect(screen.getByText(/add rule/i)).toBeInTheDocument();
    expect(screen.getByText(/update ingress/i)).toBeInTheDocument();
  });

  test('updates input values', () => {
    userEvent.type(screen.getByLabelText(/ingress name/i), 'test-ingress');
    userEvent.type(screen.getByPlaceholderText(/host/i), 'example.com');
    userEvent.type(screen.getByPlaceholderText(/path/i), '/');
    userEvent.type(screen.getByPlaceholderText(/service name/i), 'test-service');
    userEvent.type(screen.getByPlaceholderText(/service port/i), '80');

    expect(screen.getByLabelText(/ingress name/i)).toHaveValue('test-ingress');
    expect(screen.getByPlaceholderText(/host/i)).toHaveValue('example.com');
    expect(screen.getByPlaceholderText(/path/i)).toHaveValue('/');
    expect(screen.getByPlaceholderText(/service name/i)).toHaveValue('test-service');
    expect(screen.getByPlaceholderText(/service port/i)).toHaveValue('80');
  });

  test('adds ingress rule and calls onUpdate with correct values', () => {
    userEvent.type(screen.getByLabelText(/ingress name/i), 'test-ingress');
    userEvent.type(screen.getByPlaceholderText(/host/i), 'example.com');
    userEvent.type(screen.getByPlaceholderText(/path/i), '/');
    userEvent.type(screen.getByPlaceholderText(/service name/i), 'test-service');
    userEvent.type(screen.getByPlaceholderText(/service port/i), '80');
    fireEvent.click(screen.getByText(/add rule/i));

    expect(screen.getByText('example.com / test-service 80')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/update ingress/i));
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ingressName: 'test-ingress',
      ingressRules: [
        {
          host: 'example.com',
          path: '/',
          serviceName: 'test-service',
          servicePort: 80,
        },
      ],
    });
  });
});
