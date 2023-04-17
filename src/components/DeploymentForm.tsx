import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import EnvVarCreator from './EnvVarForm';
import ResourceForm from './ResourceForm';
import ProbeForm from './ProbeForm';
import Volumes from './VolumeForm';
import VolumeMounts from './VolumeMountForm';
import { VolumeMount } from '../types/volumeMount';
import { Probes } from '../types/probe';
import { EnvVar } from '../types/envVar';
import { Resources } from '../types/resource';
import { Volume } from '../types/volume';

interface Deployment {
  name: string;
  namespace: string;
  labels: { [key: string]: string };
  serviceAccountName: string;
  containerImage: string;
  envVars: EnvVar[];
  resources: Resources;
  probes: Probes;
  volumes: Volume[];
  volumeMounts: VolumeMount[];
}

const initialDeployment: Deployment = {
  name: '',
  namespace: '',
  labels: {},
  serviceAccountName: '',
  containerImage: '',
  envVars: [],
  resources: {},
  probes: {},
  volumes: [],
  volumeMounts: [],
};

interface Props {
  onUpdate: (data: Deployment | null) => void;
}

const DeploymentForm: React.FC<Props> = ({ onUpdate }) => {
  const [deployment, setDeployment] = useState<Deployment>(initialDeployment);

  const handleDeploymentChange = (key: keyof Deployment, value: any) => {
    setDeployment({ ...deployment, [key]: value });
    onUpdate({ ...deployment, [key]: value });
  };

  return (
    <>
      <h2>Deployment</h2>
      <Form>
        <Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label className="text-white">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter deployment name"
              value={deployment.name}
              onChange={e => handleDeploymentChange('name', e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="namespace">
            <Form.Label className="text-white">Namespace</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter namespace"
              value={deployment.namespace}
              onChange={e => handleDeploymentChange('namespace', e.target.value)}
            />
          </Form.Group>
        </Row>

        {/* Add the Container subcomponent */}
        <Row>
          <Form.Group as={Col} controlId="containerImage">
            <Form.Label className="text-white">Container Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter container image"
              value={deployment.containerImage}
              onChange={e => handleDeploymentChange('containerImage', e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="serviceAccountName">
            <Form.Label className="text-white">Service Account Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter service account name"
              value={deployment.serviceAccountName}
              onChange={e => handleDeploymentChange('serviceAccountName', e.target.value)}
            />
          </Form.Group>
        </Row>

        <EnvVarCreator
          onEnvVarListChange={(updatedEnvVars: EnvVar[]) =>
            handleDeploymentChange('envVars', updatedEnvVars)
          }
        />

        <ResourceForm
          currentResources={deployment.resources}
          onResourcesUpdate={(updatedResources: Resources) =>
            handleDeploymentChange('resources', updatedResources)
          }
        />

        <ProbeForm
          probes={deployment.probes}
          onUpdate={(updatedProbes: Probes[]) => handleDeploymentChange('probes', updatedProbes)}
        />

        <Volumes
          volumes={deployment.volumes}
          onUpdate={(updatedVolumes: Volume[]) => {
            handleDeploymentChange('volumes', updatedVolumes);
          }}
        />

        <VolumeMounts
          volumeMounts={deployment.volumeMounts}
          onUpdate={(updatedVolumeMounts: VolumeMount[]) => {
            handleDeploymentChange('volumeMounts', updatedVolumeMounts);
          }}
        />
      </Form>
    </>
  );
};

export default DeploymentForm;
