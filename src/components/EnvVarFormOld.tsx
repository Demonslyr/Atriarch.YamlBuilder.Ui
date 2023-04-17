// components/DeploymentForm/EnvVarForm.tsx

import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { EnvVar } from '../types/envVar';

interface EnvVarFormProps {
  envVars: EnvVar[];
  onUpdate: (updatedEnvVars: EnvVar[]) => void;
}

const EnvVarFormOld = ({ onEnvVarChange, onEnvVarDelete, envVar }: any) => {
  const [key, setKey] = useState(envVar?.name || '');
  const [value, setValue] = useState(envVar?.value || '');
  const [valueFrom, setValueFrom] = useState(envVar?.valueFrom || '');
  const [secretKeyRefName, setSecretKeyRefName] = useState(envVar?.secretKeyRef?.name || '');
  const [secretKeyRefKey, setSecretKeyRefKey] = useState(envVar?.secretKeyRef?.key || '');

  const handleEnvVarChange = () => {
    onEnvVarChange({
      name: key,
      value,
      valueFrom,
      secretKeyRef: {
        name: secretKeyRefName,
        key: secretKeyRefKey,
      },
    });
  };

  return (
    <Row>
      <Col>
        <Form.Group controlId="envVarName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Environment Variable Name"
            value={key}
            onChange={e => {
              setKey(e.target.value);
              handleEnvVarChange();
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="envVarValue">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="text"
            placeholder="Environment Variable Value"
            value={value}
            onChange={e => {
              setValue(e.target.value);
              handleEnvVarChange();
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="envVarValueFrom">
          <Form.Label>Value From</Form.Label>
          <Form.Control
            type="text"
            placeholder="Environment Variable Value From"
            value={valueFrom}
            onChange={e => {
              setValueFrom(e.target.value);
              handleEnvVarChange();
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="secretKeyRefName">
          <Form.Label>Secret Key Ref Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Secret Key Reference Name"
            value={secretKeyRefName}
            onChange={e => {
              setSecretKeyRefName(e.target.value);
              handleEnvVarChange();
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="secretKeyRefKey">
          <Form.Label>Secret Key Ref Key</Form.Label>
          <Form.Control
            type="text"
            placeholder="Secret Key Reference Key"
            value={secretKeyRefKey}
            onChange={e => {
              setSecretKeyRefKey(e.target.value);
              handleEnvVarChange();
            }}
          />
        </Form.Group>
      </Col>
      <Col>
        <Button className="mt-4" variant="danger" onClick={() => onEnvVarDelete(key)}>
          Remove
        </Button>
      </Col>
    </Row>
  );
};

export default EnvVarFormOld;
