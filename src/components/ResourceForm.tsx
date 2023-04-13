// components/DeploymentForm/ResourceForm.tsx

import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const ResourceForm = ({ onResourceChange, title, resource = {} }: any) => {
  const [cpu, setCpu] = useState(resource.cpu || '');
  const [memory, setMemory] = useState(resource.memory || '');

  const handleResourceChange = () => {
    onResourceChange({ cpu, memory });
  };

  return (
    <>
      <h5>{title}</h5>
      <Row>
        <Col>
          <Form.Group controlId={`${title}Cpu`}>
            <Form.Label>CPU (in millicores)</Form.Label>
            <Form.Control
              type="number"
              placeholder="CPU"
              value={cpu}
              onChange={e => {
                setCpu(e.target.value);
                handleResourceChange();
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`${title}Memory`}>
            <Form.Label>Memory (in MiB)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Memory"
              value={memory}
              onChange={e => {
                setMemory(e.target.value);
                handleResourceChange();
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default ResourceForm;
