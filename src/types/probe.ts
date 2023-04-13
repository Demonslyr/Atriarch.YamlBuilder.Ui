export interface Probes {
  livenessProbe?: {
    httpGet?: {
      path: string;
      port: number;
    };
    failureThreshold?: number;
    periodSeconds?: number;
  };
  startupProbe?: {
    httpGet?: {
      path: string;
      port: number;
    };
    failureThreshold?: number;
    periodSeconds?: number;
  };
}
