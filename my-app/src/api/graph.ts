import type { Node, Edge } from 'reactflow';

export function fetchGraph(appId: string): Promise<{
  nodes: Node[];
  edges: Edge[];
}> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random error
      if (Math.random() < 0.15) {
        reject(new Error('Failed to load graph'));
        return;
      }

      resolve({
        nodes: [
          {
            id: '1',
            position: { x: 100, y: 100 },
            data: { label: `${appId} - Postgres` },
          },
          {
            id: '2',
            position: { x: 400, y: 150 },
            data: { label: `${appId} - Redis` },
          },
          {
            id: '3',
            position: { x: 250, y: 350 },
            data: { label: `${appId} - MongoDB` },
          },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2' },
          { id: 'e2-3', source: '2', target: '3' },
        ],
      });
    }, 1000);
  });
}
