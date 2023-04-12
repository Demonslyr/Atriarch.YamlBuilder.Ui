import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ConfigMapForm from '../components/ConfigMapForm';

describe('ConfigMapForm', () => {
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    render(<ConfigMapForm onUpdate={mockOnUpdate} />);
  });

  afterEach(() => {
    mockOnUpdate.mockClear();
  });

  test('renders form elements', () => {
    expect(screen.getByLabelText(/configmap name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/key/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/value/i)).toBeInTheDocument();
    expect(screen.getByText(/add data/i)).toBeInTheDocument();
    expect(screen.getByText(/update configmap/i)).toBeInTheDocument();
  });

  test('updates input values', () => {
    userEvent.type(screen.getByLabelText(/configmap name/i), 'test-configmap');
    userEvent.type(screen.getByPlaceholderText(/key/i), 'configKey');
    userEvent.type(screen.getByPlaceholderText(/value/i), 'configValue');

    expect(screen.getByLabelText(/configmap name/i)).toHaveValue('test-configmap');
    expect(screen.getByPlaceholderText(/key/i)).toHaveValue('configKey');
    expect(screen.getByPlaceholderText(/value/i)).toHaveValue('configValue');
  });

  test('adds configmap data and calls onUpdate with correct values', () => {
    userEvent.type(screen.getByLabelText(/configmap name/i), 'test-configmap');
    userEvent.type(screen.getByPlaceholderText(/key/i), 'configKey');
    userEvent.type(screen.getByPlaceholderText(/value/i), 'configValue');
    fireEvent.click(screen.getByText(/add data/i));

    expect(screen.getByText('configKey: configValue')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/update configmap/i));
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith({
      configMapName: 'test-configmap',
      configMapData: [
        {
          key: 'configKey',
          value: 'configValue',
        },
      ],
    });
  });
});
