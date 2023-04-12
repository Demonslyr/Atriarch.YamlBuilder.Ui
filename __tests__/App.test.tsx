import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders form components', () => {
    expect(screen.getByText(/k8s yaml generator/i)).toBeInTheDocument();
    expect(screen.getByText(/deployment form/i)).toBeInTheDocument();
    expect(screen.getByText(/hpa form/i)).toBeInTheDocument();
    expect(screen.getByText(/ingress form/i)).toBeInTheDocument();
    expect(screen.getByText(/secret form/i)).toBeInTheDocument();
    expect(screen.getByText(/configmap form/i)).toBeInTheDocument();
    expect(screen.getByText(/arbitrary yaml form/i)).toBeInTheDocument();
    expect(screen.getByText(/service form/i)).toBeInTheDocument();
    expect(screen.getByText(/generate yaml/i)).toBeInTheDocument();
  });

  test('generate yaml button click', () => {
    const downloadLink = document.createElement('a');
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    const clickSpy = jest.spyOn(downloadLink, 'click');
    const createElementSpy = jest.spyOn(document, 'createElement').mockImplementation(() => downloadLink);

    fireEvent.click(screen.getByText(/generate yaml/i));

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(createElementSpy).toHaveBeenCalledTimes(1);

    document.body.removeChild(downloadLink);
    createElementSpy.mockRestore();
  });
});
