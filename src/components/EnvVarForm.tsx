import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, ListGroup } from 'react-bootstrap';

type EnvVar = {
  name: string;
  valueType: 'value' | 'configMapKeyRef' | 'secretKeyRef' | 'fieldRef';
  value?: string;
  refName?: string;
  refKey?: string;
};

interface EnvVarCreatorProps {
  onEnvVarListChange: (envVars: EnvVar[]) => void;
}

const EnvVarCreator: React.FC<EnvVarCreatorProps> = ({ onEnvVarListChange }) => {
  const [envVars, setEnvVars] = useState<EnvVar[]>([]);
  const [formState, setFormState] = useState<EnvVar>({
    name: '',
    valueType: 'value',
  });

  const updateEnvVars = (newEnvVars: EnvVar[]) => {
    setEnvVars(newEnvVars);
    onEnvVarListChange(newEnvVars);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const renderValueFields = () => {
    switch (formState.valueType) {
      case 'value':
        return (
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Value
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="value"
                value={formState.value || ''}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        );
      case 'configMapKeyRef':
      case 'secretKeyRef':
        return (
          <>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                {formState.valueType === 'configMapKeyRef' ? 'ConfigMap Name' : 'Secret Name'}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="refName"
                  value={formState.refName || ''}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Key
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="refKey"
                  value={formState.refKey || ''}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
          </>
        );
      case 'fieldRef':
        return (
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Field Path
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name="refKey"
                value={formState.refKey || ''}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        );
      default:
        return null;
    }
  };

  const addEnvVar = () => {
    const newEnvVars = [...envVars, formState];
    updateEnvVars(newEnvVars);
    setFormState({
      name: '',
      valueType: 'value',
    });
  };

  const removeEnvVar = (index: number) => {
    const newEnvVars = [...envVars];
    newEnvVars.splice(index, 1);
    updateEnvVars(newEnvVars);
  };

  return (
    <Container>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" name="name" value={formState.name} onChange={handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Value Type
          </Form.Label>
          <Col sm="10">
            <Form.Check
              type="radio"
              label="Value"
              name="valueType"
              value="value"
              checked={formState.valueType === 'value'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="ConfigMap Key Ref"
              name="valueType"
              value="configMapKeyRef"
              checked={formState.valueType === 'configMapKeyRef'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Secret Key Ref"
              name="valueType"
              value="secretKeyRef"
              checked={formState.valueType === 'secretKeyRef'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Field Ref"
              name="valueType"
              value="fieldRef"
              checked={formState.valueType === 'fieldRef'}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        {renderValueFields()}
        <Button onClick={addEnvVar}>Add Environment Variable</Button>
      </Form>
      <ListGroup>
        {envVars.map((envVar, index) => (
          <ListGroup.Item key={index}>
            {JSON.stringify(envVar)}
            <Button
              variant="danger"
              size="sm"
              className="float-right"
              onClick={() => removeEnvVar(index)}
            >
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default EnvVarCreator;
