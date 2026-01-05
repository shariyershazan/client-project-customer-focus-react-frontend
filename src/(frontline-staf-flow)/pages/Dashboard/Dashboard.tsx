import { CheckCircle2, Flame } from 'lucide-react';
import MetricCard from './_components/MetricCard';
import HabitAnalytics from './_components/HabitAnalytics';
import TodaysProgress from './_components/TodaysProgress';
import TodaysHuddles from './_components/TodaysHuddles';
import UpcomingSessions from './_components/UpcomingSessions';

const FrontLineDashboard = () => {
  // Metric Cards Data 
  const metricsData = [
    {
      id: 'habit-completed',
      title: 'Habit Completed',
      value: 15,
      icon: CheckCircle2
    },
    {
      id: 'total-habits',
      title: 'Total Habits',
      value: 15,
      icon: CheckCircle2
    },
    {
      id: 'best-streak',
      title: 'Best Streak',
      value: 15,
      icon: Flame
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen space-y-6 sm:space-y-8 bg-slate-50">
      {/* Top Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {metricsData.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Analytics and Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-9">
          <HabitAnalytics />
        </div>
        <div className="lg:col-span-3">
          <TodaysProgress />
        </div>
      </div>

      {/* Today's Huddles Section */}
      <TodaysHuddles />

      {/* Upcoming Sessions Section */}
      <UpcomingSessions />
    </div>
  );
};

export default FrontLineDashboard;