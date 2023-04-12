import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

interface ConfigMapData {
  key: string;
  value: string;
}

interface Props {
  onUpdate: (config: { configMapName: string; configMapData: ConfigMapData[] }) => void;
}

const ConfigMapForm: React.FC<Props> = ({ onUpdate }) => {
  const [configMapName, setConfigMapName] = useState('');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [configMapData, setConfigMapData] = useState<ConfigMapData[]>([]);

  const handleAddData = () => {
    setConfigMapData([...configMapData, { key, value }]);
    setKey('');
    setValue('');
  };

  const handleUpdate = () => {
    onUpdate({ configMapName, configMapData });
  };

  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          ConfigMap Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Enter ConfigMap name"
            value={configMapName}
            onChange={e => setConfigMapName(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Data
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="text"
            placeholder="Key"
            value={key}
            onChange={e => setKey(e.target.value)}
          />
        </Col>
        <Col sm={4}>
          <Form.Control
            type="text"
            placeholder="Value"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Col>
        <Col sm={2}>
          <Button variant="primary" onClick={handleAddData}>
            Add Data
          </Button>
        </Col>
      </Form.Group>
      <ul>
        {configMapData.map((data, index) => (
          <li key={index}>
            {data.key}: {data.value}
          </li>
        ))}
      </ul>
      <Button variant="success" onClick={handleUpdate}>
        Update ConfigMap
      </Button>
    </Form>
  );
};

export default ConfigMapForm;
