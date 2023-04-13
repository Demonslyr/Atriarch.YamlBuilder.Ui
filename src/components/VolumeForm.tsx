// components/DeploymentForm/VolumeForm.tsx

import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Volume } from '../types/volume';

interface VolumeFormProps {
  volumes: Volume[];
  onUpdate: (updatedVolumes: Volume[]) => void;
}

const VolumeForm = ({ onVolumeChange, onVolumeDelete, volume }: any) => {
  const [name, setName] = useState(volume?.name || '');
  const [server, setServer] = useState(volume?.nfs?.server || '');
  const [path, setPath] = useState(volume?.nfs?.path || '');

  const handleVolumeChange = () => {
    onVolumeChange({ name, nfs: { server, path } });
  };

  return (
    <Row>
      <Col>
        <Form.Group controlId="volumeName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Volume Name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              handleVolumeChange();
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="volumeServer">
          <Form.Label>NFS Server</Form.Label>
          <Form.Control
            type="text"
            placeholder="NFS Server"
            value={server}
            onChange={e => {
              setServer(e.target.value);
              handleVolumeChange();
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="volumePath">
          <Form.Label>NFS Path</Form.Label>
          <Form.Control
            type="text"
            placeholder="NFS Path"
            value={path}
            onChange={e => {
              setPath(e.target.value);
              handleVolumeChange();
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Button className="mt-4" variant="danger" onClick={() => onVolumeDelete(name)}>
          Remove
        </Button>
      </Col>
    </Row>
  );
};

export default VolumeForm;
