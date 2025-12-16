import { Badge } from '../components/ui/badge';
import type{ NodeStatus } from '../types/graph';

const STATUS_MAP: Record<NodeStatus, string> = {
  healthy: 'bg-green-600 dark:bg-green-700',
  degraded: 'bg-yellow-500 dark:bg-yellow-600',
  down: 'bg-red-600 dark:bg-red-700',
};

const StatusPill = ({ status }: { status: NodeStatus }) => {
    return (
        <Badge className={`${STATUS_MAP[status]} text-white`}>
          {status}
        </Badge>
      );
}

export default StatusPill
