import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

interface Props {
  onUpdate: (yaml: string) => void;
}

const ArbitraryYamlForm: React.FC<Props> = ({ onUpdate }) => {
  const [yaml, setYaml] = useState('');

  const handleUpdate = () => {
    onUpdate(yaml);
  };

  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Arbitrary YAML
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={8}
            placeholder="Enter arbitrary YAML"
            value={yaml}
            onChange={e => setYaml(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Button variant="success" onClick={handleUpdate}>
        Update YAML
      </Button>
    </Form>
  );
};

export default ArbitraryYamlForm;
