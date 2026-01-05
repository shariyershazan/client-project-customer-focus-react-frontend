import { Users, CheckCircle, Target, TrendingUp } from "lucide-react";
import { LiaInfoCircleSolid } from "react-icons/lia";

const SummaryStats = () => {
  const stats = [
    { title: "Team Adherence", value: "85%", change: "13.45%", icon: <Users />, color: "text-purple-600" },
    { title: "Huddle Completeddd", value: "120", icon: <CheckCircle />, color: "text-purple-600" },
    { title: "Roleplays Scored", value: "15", icon: <Target />, color: "text-purple-600" },
    { title: "CSAT", value: "1.8 pts", change: "↑ 1.8 pts", icon: <TrendingUp />, isCSAT: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between gap-3">

             <div className="flex items-center gap-2">
            <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-[#8C23CC] rounded-xl">
              {stat.icon}
            </div>
           
          </div>
          <p className="text-lg font-bold text-slate-600">{stat.title}</p>
          </div>
           {stat.change && (
              <span className={`text-xs font-bold ${stat.isCSAT ? 'text-purple-500' : 'text-green-500'}`}>
                {stat.change}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-extrabold text-[#8C23CC]">{stat.value}</h2>
            {stat.isCSAT && <span className="text-amber-500 text-xl"><LiaInfoCircleSolid /></span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;