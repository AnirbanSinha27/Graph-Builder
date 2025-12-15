export type NodeStatus = 'healthy' | 'degraded' | 'down';

export interface ServiceNodeData {
  label: string;
  status: NodeStatus;
  cpu: number; // 0–100
  description?: string;
}
