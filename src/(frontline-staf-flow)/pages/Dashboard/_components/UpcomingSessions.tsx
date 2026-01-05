import { Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CommonTable, { type Column } from '@/components/shared/common/CommonTable';

interface SessionData {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  duration: string;
  agenda: string;
  hasMaterials: boolean;
}

const UpcomingSessions = () => {
  // Upcoming Sessions Data - defined directly in component
  const upcomingSessionsData: SessionData[] = [
    {
      id: '1',
      title: 'Session Title',
      date: 'April 14, 2020',
      time: '5:20 PM',
      speaker: 'David',
      duration: '50min',
      agenda: 'Build one tool that helps your clients cut customer complaints',
      hasMaterials: true
    },
    {
      id: '2',
      title: 'Session Title',
      date: 'April 14, 2020',
      time: '5:20 PM',
      speaker: 'David',
      duration: '50min',
      agenda: 'Build one tool that helps your clients cut customer complaints',
      hasMaterials: true
    },
    {
      id: '3',
      title: 'Session Title',
      date: 'April 14, 2020',
      time: '5:20 PM',
      speaker: 'David',
      duration: '50min',
      agenda: 'Build one tool that helps your clients cut customer complaints',
      hasMaterials: true
    },
    {
      id: '4',
      title: 'Session Title',
      date: 'April 14, 2020',
      time: '5:20 PM',
      speaker: 'David',
      duration: '50min',
      agenda: 'Build one tool that helps your clients cut customer complaints',
      hasMaterials: true
    }
  ];

  const columns: Column<SessionData>[] = [
    {
      header: 'Title',
      render: (item) => (
        <span className="font-semibold text-slate-900">{item.title}</span>
      ),
    },
    {
      header: 'Date & Time',
      render: (item) => (
        <div>
          <div className="text-slate-900">{item.date}</div>
          <div className="text-xs text-slate-500">{item.time}</div>
        </div>
      ),
    },
    {
      header: 'Speaker',
      render: (item) => (
        <span className="text-slate-700">{item.speaker}</span>
      ),
    },
    {
      header: 'Duration',
      render: (item) => (
        <span className="text-slate-700">{item.duration}</span>
      ),
    },
    {
      header: 'Agenda',
      render: (item) => (
        <div className="text-slate-700 text-sm max-w-[200px] whitespace-normal">
          <p className="line-clamp-2 leading-5 wrap-break-word">
            {item.agenda}
          </p>
        </div>
      ),
    },
    {
      header: 'Materials',
      render: (item) =>
        item.hasMaterials ? (
          <Button
            variant="link"
            className="text-[#8C23CC] hover:text-[#761eb0] p-0 h-auto"
          >
            View
          </Button>
        ) : (
          <span className="text-slate-400">-</span>
        ),
    },
    {
      header: 'Action',
      render: () => (
        <Button
          size="sm"
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white"
        >
          Join Now
        </Button>
      ),
    },
  ];

  return (
    <>
     <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-900">Upcoming Sessions</h3>
        <Button
          variant="outline"
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white border-0"
        >
          View All
        </Button>
      </div>
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
      {/* Search and Export row */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by title"
            className="pl-10 border-slate-200"
          />
        </div>
        <Button variant="outline" className="border-slate-200">
          Export CSV
          <Download className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <CommonTable columns={columns} data={upcomingSessionsData} />
    </div>
    </>
  );
};

export default UpcomingSessions;

