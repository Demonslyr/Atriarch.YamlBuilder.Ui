import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

interface SecretData {
  key: string;
  value: string;
}

interface SecretInput {
  secretName: string;
  secretData: SecretData[];
}

interface SecretFormProps {
  onUpdate: (input: SecretInput) => void;
}

const SecretForm: React.FC<SecretFormProps> = ({ onUpdate }) => {
  const [secretName, setSecretName] = useState('');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [secretData, setSecretData] = useState<SecretData[]>([]);

  const handleSubmit = () => {
    onUpdate({
      secretName,
      secretData,
    });
  };

  const handleAddData = () => {
    if (key && value) {
      setSecretData(prevData => [
        ...prevData,
        {
          key,
          value,
        },
      ]);
      setKey('');
      setValue('');
    }
  };

  return (
    <div>
      <h2>Secret</h2>
      <Form>
        <Form.Group controlId="secretName">
          <Form.Label>Secret Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter secret name"
            value={secretName}
            onChange={e => setSecretName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Secret Data</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Key"
                value={key}
                onChange={e => setKey(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Value"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </Col>
            <Col>
              <Button onClick={handleAddData}>Add Data</Button>
            </Col>
          </Row>
          {secretData.map((data, index) => (
            <div key={index}>
              {data.key}: {data.value}
            </div>
          ))}
        </Form.Group>
      </Form>
      <Button onClick={handleSubmit}>Update Secret</Button>
    </div>
  );
};

export default SecretForm;
