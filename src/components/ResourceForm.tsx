import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

interface Resources {
  requests?: ResourceObject;
  limits?: ResourceObject;
}

interface ResourceObject {
  cpu?: string;
  memory?: string;
}

interface Units {
  requests?: ResourceUnits;
  limits?: ResourceUnits;
}

interface ResourceUnits {
  cpu?: string;
  memory?: string;
}

interface ResourceFormProps {
  onResourcesUpdate: (resources: Resources) => void;
  currentResources: Resources;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ onResourcesUpdate, currentResources }) => {
  const [resources, setResources] = useState<Resources>(currentResources);
  const [units, setUnits] = useState<Units>({});

  useEffect(() => {
    setResources(currentResources);
  }, [currentResources]);

  const cpuUnits = ['m'];
  const memoryUnits = ['Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei'];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    resourceType: keyof Resources,
    resource: keyof ResourceObject
  ) => {
    const value = e.target.value;
    setResources(prevState => ({
      ...prevState,
      [resourceType]: {
        ...prevState[resourceType],
        [resource]: value + (units[resourceType]?.[resource] || ''),
      },
    }));
  };

  const handleUnitChange = (
    e: ChangeEvent<HTMLSelectElement>,
    resourceType: keyof Resources,
    resource: keyof ResourceObject
  ) => {
    const unit = e.target.value;
    setUnits(prevState => ({
      ...prevState,
      [resourceType]: {
        ...prevState[resourceType],
        [resource]: unit,
      },
    }));
    setResources(prevState => {
      const currentValue = prevState[resourceType]?.[resource]?.replace(/[^\d.]/g, '') as
        | string
        | undefined;
      return {
        ...prevState,
        [resourceType]: {
          ...prevState[resourceType],
          [resource]: currentValue ? currentValue + unit : unit,
        },
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResourcesUpdate(resources);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {(['requests', 'limits'] as const).map(resourceType => (
        <Row key={resourceType} className="mb-3">
          <Col>
            <h5>{resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}</h5>
          </Col>
          {(['cpu', 'memory'] as const).map(resource => (
            <Col key={resource}>
              <Form.Group controlId={`${resourceType}.${resource}`}>
                <Form.Label>{resource.toUpperCase()}</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Enter value"
                  value={resources[resourceType]?.[resource]?.replace(/[^\d.]/g, '') || ''}
                  onChange={e =>
                    handleInputChange(
                      e as React.ChangeEvent<HTMLInputElement>,
                      resourceType,
                      resource
                    )
                  }
                />
                <Form.Select
                  className="mt-2"
                  value={units[resourceType]?.[resource] || ''}
                  onChange={e => handleUnitChange(e, resourceType, resource)}
                >
                  <option value="">Select unit</option>
                  {(resource === 'cpu' ? cpuUnits : memoryUnits).map(unit => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          ))}
        </Row>
      ))}
      <Button variant="primary" type="submit">
        Update Resources
      </Button>
    </Form>
  );
};

export default ResourceForm;
