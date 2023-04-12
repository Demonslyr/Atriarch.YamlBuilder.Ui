import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';
import './DeploymentForm.css';

interface DeploymentFormProps {
  onUpdate: (data: object) => void;
}

const DeploymentForm: React.FC<DeploymentFormProps> = ({ onUpdate }) => {
  const [name, setName] = useState('');
  const [replicas, setReplicas] = useState('');
  const [image, setImage] = useState('');
  const [env, setEnv] = useState('');
  const [volume, setVolume] = useState('');
  const [resourceLimits, setResourceLimits] = useState('');
  const [imagePullSecrets, setImagePullSecrets] = useState('');

  const handleUpdate = () => {
    onUpdate({
      kind: 'Deployment',
      apiVersion: 'apps/v1',
      metadata: {
        name,
      },
      spec: {
        replicas: parseInt(replicas),
        template: {
          spec: {
            containers: [
              {
                name,
                image,
              },
            ],
          },
        },
      },
    });
  };

  useEffect(() => {
    handleUpdate();
  }, [name, replicas, image, env, volume, resourceLimits, imagePullSecrets]);

  return (
    <div className="deployment-form">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Deployment</Card.Title>
          <Form>
            <Row>
              <Form.Group as={Col} controlId="formDeploymentName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="form-control-light"
                  type="text"
                  placeholder="Enter deployment name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={handleUpdate}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formDeploymentReplicas">
                <Form.Label>Replicas</Form.Label>
                <Form.Control
                  className="form-control-light"
                  type="number"
                  min="1"
                  placeholder="Enter number of replicas"
                  value={replicas}
                  onChange={e => setReplicas(e.target.value)}
                  onBlur={handleUpdate}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formDeploymentImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  className="form-control-light"
                  type="text"
                  placeholder="Enter container image"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  onBlur={handleUpdate}
                />
              </Form.Group>
            </Row>
            {/* Add environment variables, volumes, resource limits and requests, and imagePullSecrets fields */}
            <Row>
              <Form.Group as={Col} controlId="formDeploymentEnv">
                <Form.Label>Environment Variables</Form.Label>
                <Form.Control
                  className="form-control-light"
                  type="text"
                  placeholder="Enter environment variables"
                  value={env}
                  onChange={e => setEnv(e.target.value)}
                  onBlur={handleUpdate}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formDeploymentVolume">
                <Form.Label>Volumes</Form.Label>
                <Form.Control
                  className="form
                  control-light"
                  type="text"
                  placeholder="Enter volumes"
                  value={volume}
                  onChange={e => setVolume(e.target.value)}
                  onBlur={handleUpdate}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formDeploymentResourceLimits">
                <Form.Label>Resource Limits and Requests</Form.Label>
                <Form.Control
                  className="form-control-light"
                  type="text"
                  placeholder="Enter resource limits and requests"
                  value={resourceLimits}
                  onChange={e => setResourceLimits(e.target.value)}
                  onBlur={handleUpdate}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formDeploymentImagePullSecrets">
                <Form.Label>Image Pull Secrets</Form.Label>
                <Form.Control
                  className="form-control-light"
                  type="text"
                  placeholder="Enter image pull secrets"
                  value={imagePullSecrets}
                  onChange={e => setImagePullSecrets(e.target.value)}
                  onBlur={handleUpdate}
                />
              </Form.Group>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DeploymentForm;
