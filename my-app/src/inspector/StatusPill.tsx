import { Badge } from '../components/ui/badge';
import type{ NodeStatus } from '../types/graph';

const STATUS_MAP: Record<NodeStatus, string> = {
  healthy: 'bg-green-600',
  degraded: 'bg-yellow-500',
  down: 'bg-red-600',
};

const StatusPill = ({ status }: { status: NodeStatus }) => {
    return (
        <Badge className={`${STATUS_MAP[status]} text-white`}>
          {status}
        </Badge>
      );
}

export default StatusPill
