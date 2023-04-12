import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import SecretForm from '../components/SecretForm';

describe('SecretForm', () => {
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    render(<SecretForm onUpdate={mockOnUpdate} />);
  });

  afterEach(() => {
    mockOnUpdate.mockClear();
  });

  test('renders form elements', () => {
    expect(screen.getByLabelText(/secret name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/key/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/value/i)).toBeInTheDocument();
    expect(screen.getByText(/add data/i)).toBeInTheDocument();
    expect(screen.getByText(/update secret/i)).toBeInTheDocument();
  });

  test('updates input values', () => {
    userEvent.type(screen.getByLabelText(/secret name/i), 'test-secret');
    userEvent.type(screen.getByPlaceholderText(/key/i), 'username');
    userEvent.type(screen.getByPlaceholderText(/value/i), 'testuser');

    expect(screen.getByLabelText(/secret name/i)).toHaveValue('test-secret');
    expect(screen.getByPlaceholderText(/key/i)).toHaveValue('username');
    expect(screen.getByPlaceholderText(/value/i)).toHaveValue('testuser');
  });

  test('adds secret data and calls onUpdate with correct values', () => {
    userEvent.type(screen.getByLabelText(/secret name/i), 'test-secret');
    userEvent.type(screen.getByPlaceholderText(/key/i), 'username');
    userEvent.type(screen.getByPlaceholderText(/value/i), 'testuser');
    fireEvent.click(screen.getByText(/add data/i));

    expect(screen.getByText('username: testuser')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/update secret/i));
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith({
      secretName: 'test-secret',
      secretData: [
        {
          key: 'username',
          value: 'testuser',
        },
      ],
    });
  });
});
