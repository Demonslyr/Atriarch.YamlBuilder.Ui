import { EnvVar } from './envVar';
import { Probes } from './probe';
import { Resources } from './resource';
import { Volume } from './volume';
import { VolumeMount } from './volumeMount';

export interface Deployment {
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
