import React, { useState } from 'react';
import './App.css';
import DeploymentForm from './components/DeploymentForm';
import HpaForm from './components/HpaForm';
import IngressForm from './components/IngressForm';
import SecretForm from './components/SecretForm';
import ConfigMapForm from './components/ConfigMapForm';
import ArbitraryYamlForm from './components/ArbitraryYamlForm';
import ServiceForm from './components/ServiceForm';
import { Button } from 'react-bootstrap';
import { dump } from 'js-yaml';
import { saveAs } from 'file-saver';

interface FormData {
  deployment: object | null;
  hpa: object | null;
  ingress: object | null;
  secret: object | null;
  configMap: object | null;
  arbitraryYaml: string | null;
  service: object | null;
}

const initialFormData: FormData = {
  deployment: null,
  hpa: null,
  ingress: null,
  secret: null,
  configMap: null,
  arbitraryYaml: null,
  service: null,
};

function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleUpdate = (key: keyof FormData) => (data: object | string) => {
    setFormData({ ...formData, [key]: data });
  };

  const generateYaml = () => {
    let yaml = '';

    Object.entries(formData).forEach(([data]) => {
      if (data) {
        yaml += dump(data, { indent: 2 }) + '---\n';
      }
    });

    const blob = new Blob([yaml], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'k8s-config.yaml');
  };

  return (
    <div className="App">
      <h1>K8s YAML Generator</h1>
      <DeploymentForm onUpdate={handleUpdate('deployment')} />
      <hr />
      <HpaForm onUpdate={handleUpdate('hpa')} />
      <hr />
      <IngressForm onUpdate={handleUpdate('ingress')} />
      <hr />
      <SecretForm onUpdate={handleUpdate('secret')} />
      <hr />
      <ConfigMapForm onUpdate={handleUpdate('configMap')} />
      <hr />
      <ArbitraryYamlForm onUpdate={handleUpdate('arbitraryYaml')} />
      <hr />
      <ServiceForm onUpdate={handleUpdate('service')} />
      <hr />
      <Button variant="success" onClick={generateYaml}>
        Generate YAML
      </Button>
    </div>
  );
}

export default App;
