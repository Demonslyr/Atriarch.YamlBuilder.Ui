export interface Volume {
  name: string;
  nfs?: {
    server: string;
    path: string;
  };
}
