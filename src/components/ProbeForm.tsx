// components/DeploymentForm/ProbeForm.tsx

import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Probes } from '../types/probe';

interface ProbeFormProps {
  probes: Probes[];
  onUpdate: (updatedProbes: Probes[]) => void;
}

const ProbeForm = ({ onProbeChange, title, probe = {} }: any) => {
  const [path, setPath] = useState(probe.path || '');
  const [port, setPort] = useState(probe.port || '');
  const [failureThreshold, setFailureThreshold] = useState(probe.failureThreshold || '');
  const [periodSeconds, setPeriodSeconds] = useState(probe.periodSeconds || '');

  const handleProbeChange = () => {
    onProbeChange({ path, port, failureThreshold, periodSeconds });
  };

  return (
    <>
      <h5>{title}</h5>
      <Row>
        <Col>
          <Form.Group controlId={`${title}Path`}>
            <Form.Label>Path</Form.Label>
            <Form.Control
              type="text"
              placeholder="Path"
              value={path}
              onChange={e => {
                setPath(e.target.value);
                handleProbeChange();
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`${title}Port`}>
            <Form.Label>Port</Form.Label>
            <Form.Control
              type="number"
              placeholder="Port"
              value={port}
              onChange={e => {
                setPort(e.target.value);
                handleProbeChange();
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`${title}FailureThreshold`}>
            <Form.Label>Failure Threshold</Form.Label>
            <Form.Control
              type="number"
              placeholder="Failure Threshold"
              value={failureThreshold}
              onChange={e => {
                setFailureThreshold(e.target.value);
                handleProbeChange();
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`${title}PeriodSeconds`}>
            <Form.Label>Period Seconds</Form.Label>
            <Form.Control
              type="number"
              placeholder="Period Seconds"
              value={periodSeconds}
              onChange={e => {
                setPeriodSeconds(e.target.value);
                handleProbeChange();
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};
export default ProbeForm;
