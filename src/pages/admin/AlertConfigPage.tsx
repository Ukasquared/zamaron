import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { useAuth } from '@/context/AuthContext';
import { listAlertRoutes, upsertAlertRoute } from '@/services/adminService';
import type { AlertChannel, AlertRoute } from '@/types/ops';
import { createId } from '@/lib/persistentStore';

export const AlertConfigPage: React.FC = () => {
  const { user } = useAuth();
  const [tick, setTick] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const routes = useMemo(() => {
    try {
      return listAlertRoutes(user);
    } catch {
      return [] as AlertRoute[];
    }
  }, [user, tick]);

  const save = (route: AlertRoute, note: string) => {
    setError(null);
    try {
      upsertAlertRoute(route, user);
      setMessage(note);
      setTick((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save route.');
    }
  };

  const addRoute = () => {
    save(
      {
        id: createId('alrt'),
        name: 'New alert route',
        eventSource: 'Neural Lattice Gate',
        minSeverity: 'WARN',
        channel: 'EMAIL',
        target: 'secops@zamoron.io',
        enabled: true,
        threshold: 3,
      },
      'Route created.'
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container/70 border border-outline/70 p-6 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">ALERT MATRIX</Badge>
            <span className="text-xs font-mono text-slate-400">Thresholds, webhooks, channel routing</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">Alert Configuration Matrix</h1>
        </div>
        <Button size="sm" icon="add_alert" onClick={addRoute}>
          Add Route
        </Button>
      </div>

      {(error || message) && (
        <div
          className={`text-xs font-mono rounded px-3 py-2 border ${
            error ? 'text-error bg-error/10 border-error/40' : 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="space-y-4">
        {routes.map((route) => (
          <Card key={route.id} variant="glass" className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <Input value={route.name} onChange={(e) => save({ ...route, name: e.target.value }, 'Name updated.')} />
              <Switch checked={route.enabled} onChange={(checked) => save({ ...route, enabled: checked }, 'Route toggled.')} label="Enabled" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <Input
                label="Event source"
                value={route.eventSource}
                onChange={(e) => save({ ...route, eventSource: e.target.value }, 'Source updated.')}
              />
              <Select
                label="Min severity"
                value={route.minSeverity}
                onChange={(e) =>
                  save({ ...route, minSeverity: e.target.value as AlertRoute['minSeverity'] }, 'Severity updated.')
                }
              >
                <option value="INFO">INFO</option>
                <option value="WARN">WARN</option>
                <option value="CRIT">CRIT</option>
              </Select>
              <Select
                label="Channel"
                value={route.channel}
                onChange={(e) => save({ ...route, channel: e.target.value as AlertChannel }, 'Channel updated.')}
              >
                <option value="WEBHOOK">WEBHOOK</option>
                <option value="EMAIL">EMAIL</option>
                <option value="TELEGRAM">TELEGRAM</option>
                <option value="PAGER">PAGER</option>
              </Select>
              <Input
                label="Threshold (events)"
                type="number"
                value={route.threshold}
                onChange={(e) => save({ ...route, threshold: Number(e.target.value) || 0 }, 'Threshold updated.')}
              />
            </div>
            <Input
              label="Target (URL, inbox, or chat id)"
              value={route.target}
              onChange={(e) => save({ ...route, target: e.target.value }, 'Target updated.')}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AlertConfigPage;
