import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';

interface HpaInput {
  hpaName: string;
  minReplicas: number;
  maxReplicas: number;
  targetCPUUtilizationPercentage: number;
}

interface HpaFormProps {
  onUpdate: (input: HpaInput) => void;
}

const HpaForm: React.FC<HpaFormProps> = ({ onUpdate }) => {
  const [hpaName, setHpaName] = useState('');
  const [minReplicas, setMinReplicas] = useState(1);
  const [maxReplicas, setMaxReplicas] = useState(5);
  const [targetCPUUtilizationPercentage, setTargetCPUUtilizationPercentage] = useState(50);

  const handleSubmit = () => {
    onUpdate({
      hpaName,
      minReplicas,
      maxReplicas,
      targetCPUUtilizationPercentage,
    });
  };

  return (
    <div>
      <h2>Horizontal Pod Autoscaler (HPA)</h2>
      <Form>
        <Form.Group controlId="hpaName">
          <Form.Label>HPA Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter HPA name"
            value={hpaName}
            onChange={e => setHpaName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="minReplicas">
          <Form.Label>Minimum Replicas</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={minReplicas}
            onChange={e => setMinReplicas(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="maxReplicas">
          <Form.Label>Maximum Replicas</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={maxReplicas}
            onChange={e => setMaxReplicas(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="targetCPUUtilizationPercentage">
          <Form.Label>Target CPU Utilization Percentage</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="100"
            value={targetCPUUtilizationPercentage}
            onChange={e => setTargetCPUUtilizationPercentage(Number(e.target.value))}
          />
        </Form.Group>
      </Form>
      <Button onClick={handleSubmit}>Update HPA</Button>
    </div>
  );
};

export default HpaForm;
