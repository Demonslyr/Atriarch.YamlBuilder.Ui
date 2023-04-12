import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

interface IngressRule {
  host: string;
  path: string;
  serviceName: string;
  servicePort: number;
}

interface IngressInput {
  ingressName: string;
  ingressRules: IngressRule[];
}

interface IngressFormProps {
  onUpdate: (input: IngressInput) => void;
}

const IngressForm: React.FC<IngressFormProps> = ({ onUpdate }) => {
  const [ingressName, setIngressName] = useState('');
  const [host, setHost] = useState('');
  const [path, setPath] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [servicePort, setServicePort] = useState('');
  const [ingressRules, setIngressRules] = useState<IngressRule[]>([]);

  const handleSubmit = () => {
    onUpdate({
      ingressName,
      ingressRules,
    });
  };

  const handleAddRule = () => {
    if (host && path && serviceName && servicePort) {
      setIngressRules(prevRules => [
        ...prevRules,
        {
          host,
          path,
          serviceName,
          servicePort: Number(servicePort),
        },
      ]);
      setHost('');
      setPath('');
      setServiceName('');
      setServicePort('');
    }
  };

  return (
    <div>
      <h2>Ingress</h2>
      <Form>
        <Form.Group controlId="ingressName">
          <Form.Label>Ingress Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ingress name"
            value={ingressName}
            onChange={e => setIngressName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingress Rules</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Host"
                value={host}
                onChange={e => setHost(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Path"
                value={path}
                onChange={e => setPath(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Service Name"
                value={serviceName}
                onChange={e => setServiceName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Service Port"
                value={servicePort}
                onChange={e => setServicePort(e.target.value)}
              />
            </Col>
            <Col>
              <Button onClick={handleAddRule}>Add Rule</Button>
            </Col>
          </Row>
          {ingressRules.map((rule, index) => (
            <div key={index}>
              {rule.host} {rule.path} {rule.serviceName} {rule.servicePort}
            </div>
          ))}
        </Form.Group>
      </Form>
      <Button onClick={handleSubmit}>Update Ingress</Button>
    </div>
  );
};

export default IngressForm;
