import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Slider } from '../components/ui/slider';
import  StatusPill  from './StatusPill';
import type { ServiceNodeData } from '../types/graph';

interface Props {
  data: ServiceNodeData;
  onChange: (data: ServiceNodeData) => void;
}

const NodeInspector = ({ data, onChange }: Props) => {
    return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Service Node</h3>
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
    
              <Textarea
                value={data.description}
                onChange={(e) =>
                  onChange({ ...data, description: e.target.value })
                }
                placeholder="Description"
              />
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
