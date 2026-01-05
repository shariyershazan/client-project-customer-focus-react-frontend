import { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnalyticsDataPoint {
  day: string;
  value: number;
}

const HabitAnalytics = () => {
  const [timeRange, setTimeRange] = useState('Monthly');
  const growth = '+12%';

  // Habit Analytics Data (Weekly) - defined directly in component
  const habitAnalyticsData: AnalyticsDataPoint[] = [
    { day: 'Mon', value: 4 },
    { day: 'Tue', value: 4.5 },
    { day: 'Wed', value: 5 },
    { day: 'Thu', value: 5.2 },
    { day: 'Fri', value: 5.2 },
    { day: 'Sat', value: 4.8 },
    { day: 'Sun', value: 2.8 }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-slate-900">Habit Analytics</h3>
            {growth && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-semibold">{growth}</span>
              </div>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-slate-200"
            >
              {timeRange}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTimeRange('Weekly')}>
              Weekly
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange('Monthly')}>
              Monthly
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange('Yearly')}>
              Yearly
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={habitAnalyticsData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8C23CC" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8C23CC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="day"
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            domain={[0, 8]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8C23CC"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
            dot={{ fill: '#8C23CC', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitAnalytics;

