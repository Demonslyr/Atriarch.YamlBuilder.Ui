import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

interface ServicePort {
  port: number;
  targetPort: number;
  protocol: string;
}

interface Props {
  onUpdate: (service: {
    serviceName: string;
    serviceType: string;
    selector: { [key: string]: string };
    ports: ServicePort[];
  }) => void;
}

const ServiceForm: React.FC<Props> = ({ onUpdate }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceType, setServiceType] = useState('ClusterIP');
  const [selectorKey, setSelectorKey] = useState('');
  const [selectorValue, setSelectorValue] = useState('');
  const [port, setPort] = useState('');
  const [targetPort, setTargetPort] = useState('');
  const [protocol, setProtocol] = useState('TCP');

  const [selector, setSelector] = useState<{ [key: string]: string }>({});
  const [ports, setPorts] = useState<ServicePort[]>([]);

  const handleAddSelector = () => {
    setSelector({ ...selector, [selectorKey]: selectorValue });
    setSelectorKey('');
    setSelectorValue('');
  };

  const handleAddPort = () => {
    setPorts([...ports, { port: parseInt(port), targetPort: parseInt(targetPort), protocol }]);
    setPort('');
    setTargetPort('');
    setProtocol('TCP');
  };

  const handleUpdate = () => {
    onUpdate({ serviceName, serviceType, selector, ports });
  };

  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Service Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Enter service name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Service Type
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option>ClusterIP</option>
            <option>NodePort</option>
            <option>LoadBalancer</option>
            <option>ExternalName</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Selector
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="text"
            placeholder="Key"
            value={selectorKey}
            onChange={(e) => setSelectorKey(e.target.value)}
          />
        </Col>
        <Col sm={4}>
          <Form.Control
            type="text"
            placeholder="Value"
            value={selectorValue}
            onChange={(e) => setSelectorValue(e.target.value)}
          />
        </Col>
        <Col sm={2}>
          <Button variant="primary" onClick={handleAddSelector}>
            Add Selector
          </Button>
        </Col>
      </Form.Group>
      <ul>
        {Object.entries(selector).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Ports
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="number"
            placeholder="Port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </Col>
        <Col sm={3}>
          <Form.Control
            type="number"
            placeholder="Target Port"
            value={targetPort}
            onChange={(e) => setTargetPort(e.target.value)}
          />
        </Col>
        <Col sm={3}>
          <Form.Control as="select" value={protocol} onChange={(e) => setProtocol(e.target.value)}>
            <option>TCP</option>
            <option>UDP</option>
            <option>SCTP</option>
          </Form.Control>
        </Col>
        <Col sm={1}>
          <Button variant="primary" onClick={handleAddPort}>
            Add Port
          </Button>
        </Col>
      </Form.Group>
      <ul>
        {ports.map((p, index) => (
          <li key={index}>
            Port: {p.port}, TargetPort: {p.targetPort}, Protocol: {p.protocol}
          </li>
        ))}
      </ul>
      <Button variant="success" onClick={handleUpdate}>
        Update Service
      </Button>
    </Form>
  );
};

export default ServiceForm;
