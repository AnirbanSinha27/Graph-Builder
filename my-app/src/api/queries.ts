import { useQuery } from '@tanstack/react-query';
import { fetchApps } from './app';
import { fetchGraph } from './graph';

export function useApps() {
  return useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
  });
}

export function useGraph(appId: string | null) {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraph(appId!),
    enabled: !!appId,
  });
}
