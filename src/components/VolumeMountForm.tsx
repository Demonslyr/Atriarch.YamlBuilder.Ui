// components/DeploymentForm/VolumeMountForm.tsx

import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { VolumeMount } from '../types/volumeMount';

interface VolumeMountFormProps {
  volumeMounts: VolumeMount[];
  onUpdate: (updatedVolumeMounts: VolumeMount[]) => void;
}

const VolumeMountForm = ({ onVolumeMountChange, onVolumeMountDelete, volumeMount }: any) => {
  const [name, setName] = useState(volumeMount?.name || '');
  const [mountPath, setMountPath] = useState(volumeMount?.mountPath || '');

  const handleVolumeMountChange = () => {
    onVolumeMountChange({ name, mountPath });
  };

  return (
    <Row>
      <Col>
        <Form.Group controlId="volumeMountName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Volume Mount Name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              handleVolumeMountChange();
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="volumeMountPath">
          <Form.Label>Mount Path</Form.Label>
          <Form.Control
            type="text"
            placeholder="Mount Path"
            value={mountPath}
            onChange={e => {
              setMountPath(e.target.value);
              handleVolumeMountChange();
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Button className="mt-4" variant="danger" onClick={() => onVolumeMountDelete(name)}>
          Remove
        </Button>
      </Col>
    </Row>
  );
};

export default VolumeMountForm;
