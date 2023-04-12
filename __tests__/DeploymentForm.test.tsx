import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeploymentForm from '../components/DeploymentForm';

describe('DeploymentForm', () => {
  test('renders DeploymentForm component', () => {
    render(<DeploymentForm onUpdate={() => {}} />);
    expect(screen.getByText('Deployment')).toBeInTheDocument();
  });

  test('submitting the form calls onUpdate with correct input data', () => {
    const mockOnUpdate = jest.fn();
    render(<DeploymentForm onUpdate={mockOnUpdate} />);

    fireEvent.change(screen.getByLabelText('Deployment Name'), { target: { value: 'my-deployment' } });
    fireEvent.change(screen.getByLabelText('Labels Key'), { target: { value: 'app' } });
    fireEvent.change(screen.getByLabelText('Labels Value'), { target: { value: 'my-app' } });
    fireEvent.click(screen.getByText('Add Label'));
    fireEvent.change(screen.getByLabelText('Replica Count'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Container Name'), { target: { value: 'my-container' } });
    fireEvent.change(screen.getByLabelText('Image Name'), { target: { value: 'my-image' } });
    fireEvent.change(screen.getByLabelText('Container Port'), { target: { value: '8080' } });
    fireEvent.click(screen.getByText('Update Deployment'));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      deploymentName: 'my-deployment',
      deploymentLabels: { app: 'my-app' },
      replicaCount: 3,
      containerName: 'my-container',
      imageName: 'my-image',
      containerPort: 8080,
    });
  });
});
