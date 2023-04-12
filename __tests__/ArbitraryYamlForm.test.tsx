import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ArbitraryYamlForm from '../components/ArbitraryYamlForm';

describe('ArbitraryYamlForm', () => {
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    render(<ArbitraryYamlForm onUpdate={mockOnUpdate} />);
  });

  afterEach(() => {
    mockOnUpdate.mockClear();
  });

  test('renders form elements', () => {
    expect(screen.getByLabelText(/arbitrary yaml/i)).toBeInTheDocument();
    expect(screen.getByText(/update yaml/i)).toBeInTheDocument();
  });

  test('updates textarea value', () => {
    const yamlText = `
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
`;

    userEvent.type(screen.getByLabelText(/arbitrary yaml/i), yamlText);

    expect(screen.getByLabelText(/arbitrary yaml/i)).toHaveValue(yamlText);
  });

  test('calls onUpdate with correct value', () => {
    const yamlText = `
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
`;

    userEvent.type(screen.getByLabelText(/arbitrary yaml/i), yamlText);
    fireEvent.click(screen.getByText(/update yaml/i));

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(yamlText);
  });
});
