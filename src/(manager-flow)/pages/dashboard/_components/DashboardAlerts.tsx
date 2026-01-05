import { AlertCircle, Clock, TrendingDown } from "lucide-react";

const DashboardAlerts = () => {
  const alerts = [
    { text: "2 huddles missed this week", icon: <AlertCircle size={16} />, color: "text-red-500", bg: "bg-red-50" },
    { text: "CSAT dropped 1.5 pts", icon: <TrendingDown size={16} />, color: "text-amber-500", bg: "bg-amber-50" },
    { text: "3 staff missed habits yesterday", icon: <Clock size={16} />, color: "text-blue-500", bg: "bg-blue-50" },
    { text: "3 staff missed habits yesterday", icon: <Clock size={16} />, color: "text-blue-500", bg: "bg-blue-50" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full">
      <h3 className="text-xl font-extrabold text-slate-900 mb-6">Alerts</h3>
      <div className="space-y-4">
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <div className={`${alert.color}`}>
              {alert.icon}
            </div>
            <p className="text-sm text-slate-600 font-medium">{alert.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAlerts;