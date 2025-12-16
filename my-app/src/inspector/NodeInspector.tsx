import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Slider } from '../components/ui/slider';
import  StatusPill  from './StatusPill';
import type { ServiceNodeData } from '../types/graph';
import { useRef } from 'react';

interface Props {
  data: ServiceNodeData;
  onChange: (data: ServiceNodeData) => void;
}

const NodeInspector = ({ data, onChange }: Props) => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // Map icons based on node label (Postgres, Redis, MongoDB)
  const getIconPath = (label: string): string | null => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('postgres')) {
      return '/postgres.png';
    } else if (lowerLabel.includes('redis')) {
      return '/redis.png';
    } else if (lowerLabel.includes('mongodb')) {
      return '/mongodb.png';
    }
    return null;
  };

  const iconPath = getIconPath(data.label);

    return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {iconPath && (
                <img 
                  src={iconPath} 
                  alt={data.label || 'Node icon'}
                  className="w-6 h-6"
                  onError={(e) => {
                    // Hide icon if it doesn't exist
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <h3 className="font-medium text-foreground">Service Node</h3>
            </div>
            <StatusPill status={data.status} />
          </div>
    
          <Tabs defaultValue="config">
            <TabsList className="w-full">
              <TabsTrigger value="config" className="flex-1">
                Config
              </TabsTrigger>
              <TabsTrigger value="runtime" className="flex-1">
                Runtime
              </TabsTrigger>
            </TabsList>
    
            <TabsContent value="config" className="space-y-3">
              <Input
                value={data.label}
                onChange={(e) =>
                  onChange({ ...data, label: e.target.value })
                }
                placeholder="Node name"
              />
    
              <div className="space-y-2">
                <Textarea
                  ref={descriptionRef}
                  value={data.description || ''}
                  onChange={(e) =>
                    onChange({ ...data, description: e.target.value })
                  }
                  placeholder="Description"
                />
              </div>
            </TabsContent>
    
            <TabsContent value="runtime" className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU</span>
                  <span>{data.cpu}</span>
                </div>
    
                <Slider
                  value={[data.cpu]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) =>
                    onChange({ ...data, cpu: value })
                  }
                />
              </div>
    
              <Input
                type="number"
                min={0}
                max={100}
                value={data.cpu}
                onChange={(e) =>
                  onChange({
                    ...data,
                    cpu: Number(e.target.value),
                  })
                }
              />
            </TabsContent>
          </Tabs>
        </div>
      );
}

export default NodeInspector
