import { useQuery } from '@tanstack/react-query';
import { fetchApps } from './app';
import { fetchGraph } from './graph';

export function useApps() {
  return useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
  });
}

// Graph query: we treat the client-side graph (including inspector edits)
// as the source of truth for the lifetime of the session.
export function useGraph(appId: string | null) {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraph(appId!),
    enabled: !!appId,
    // Keep data stable once loaded so user edits aren't blown away
    // by background refetches.
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
