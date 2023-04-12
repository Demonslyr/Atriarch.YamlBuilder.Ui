import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import styles from './DeploymentForm.module.css';

interface DeploymentInput {
  deploymentName: string;
  deploymentLabels: Record<string, string>;
  replicaCount: number;
  containerName: string;
  imageName: string;
  containerPort: number;
}

interface DeploymentFormProps {
  onUpdate: (input: DeploymentInput) => void;
}

const DeploymentForm: React.FC<DeploymentFormProps> = ({ onUpdate }) => {
  const [deploymentName, setDeploymentName] = useState('');
  const [deploymentLabelKey, setDeploymentLabelKey] = useState('');
  const [deploymentLabelValue, setDeploymentLabelValue] = useState('');
  const [replicaCount, setReplicaCount] = useState(1);
  const [containerName, setContainerName] = useState('');
  const [imageName, setImageName] = useState('');
  const [containerPort, setContainerPort] = useState(80);
  const [deploymentLabels, setDeploymentLabels] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    onUpdate({
      deploymentName,
      deploymentLabels,
      replicaCount,
      containerName,
      imageName,
      containerPort,
    });
  };

  const handleAddLabel = () => {
    if (deploymentLabelKey && deploymentLabelValue) {
      setDeploymentLabels(prevLabels => ({
        ...prevLabels,
        [deploymentLabelKey]: deploymentLabelValue,
      }));
      setDeploymentLabelKey('');
      setDeploymentLabelValue('');
    }
  };

  return (
    <div>
      <h2>Deployment</h2>
      <Form>
        <Form.Group controlId="deploymentName">
          <Form.Label>Deployment Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter deployment name"
            value={deploymentName}
            onChange={e => setDeploymentName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Labels</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Key"
                value={deploymentLabelKey}
                onChange={e => setDeploymentLabelKey(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Value"
                value={deploymentLabelValue}
                onChange={e => setDeploymentLabelValue(e.target.value)}
              />
            </Col>
            <Col>
              <Button onClick={handleAddLabel}>Add Label</Button>
            </Col>
          </Row>
          {Object.entries(deploymentLabels).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </Form.Group>

        <Form.Group controlId="replicaCount">
          <Form.Label>Replica Count</Form.Label>
          <Form.Control
            type="number"
            value={replicaCount}
            onChange={e => setReplicaCount(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="containerName">
          <Form.Label>Container Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter container name"
            value={containerName}
            onChange={e => setContainerName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="imageName">
          <Form.Label>Image Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image name"
            value={imageName}
            onChange={e => setImageName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="containerPort">
          <Form.Label>Container Port</Form.Label>
          <Form.Control
            type="number"
            value={containerPort}
            onChange={e => setContainerPort(Number(e.target.value))}
          />
        </Form.Group>
      </Form>
      <Button onClick={handleSubmit}>Update Deployment</Button>
    </div>
  );
};

export default DeploymentForm;
