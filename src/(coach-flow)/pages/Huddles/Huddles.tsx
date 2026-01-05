import { useState, useMemo } from 'react';
import { Search, Download, Filter, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CommonTable, { type Column } from '@/components/shared/common/CommonTable';
import CommonPagination from '@/components/shared/common/CommonPagination';

interface HuddleData {
  id: string;
  name: string;
  meetingId: string;
  duration: string;
  date: string;
  time: string;
  status: 'Complete' | 'Pending' | 'Cancelled';
  participants: number;
  participantAvatars: string[];
}

const CoachHuddles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  // Huddles Data - defined directly in component
  const huddlesData: HuddleData[] = useMemo(() => {
    // Avatar Images Data
    const participantAvatars = [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/men/44.jpg',
      'https://randomuser.me/api/portraits/men/68.jpg',
      'https://randomuser.me/api/portraits/men/75.jpg',
      'https://randomuser.me/api/portraits/men/91.jpg',
      'https://randomuser.me/api/portraits/men/12.jpg',
      'https://randomuser.me/api/portraits/men/25.jpg',
    ];

    return [
      {
        id: '1',
        name: 'Morning Meeting',
        meetingId: '123213',
        duration: '60min',
        date: 'April 14, 2020',
        time: '5:20 PM',
        status: 'Complete',
        participants: 8,
        participantAvatars: participantAvatars.slice(0, 4)
      },
      {
        id: '2',
        name: 'Morning Meeting',
        meetingId: '123214',
        duration: '60min',
        date: 'April 14, 2020',
        time: '5:20 PM',
        status: 'Complete',
        participants: 8,
        participantAvatars: participantAvatars.slice(0, 4)
      },
      {
        id: '3',
        name: 'Morning Meeting',
        meetingId: '123215',
        duration: '60min',
        date: 'April 14, 2020',
        time: '5:20 PM',
        status: 'Complete',
        participants: 8,
        participantAvatars: participantAvatars.slice(0, 4)
      },
      {
        id: '4',
        name: 'Morning Meeting',
        meetingId: '123216',
        duration: '60min',
        date: 'April 14, 2020',
        time: '5:20 PM',
        status: 'Complete',
        participants: 8,
        participantAvatars: participantAvatars.slice(0, 4)
      }
    ];
  }, []);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!search) return huddlesData;
    return huddlesData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.meetingId.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, huddlesData]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [currentPage, pageSize, filteredData]);

  const columns: Column<HuddleData>[] = [
    {
      header: 'Name',
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-900">{item.name}</div>
          <div className="text-xs text-slate-500">Meeting ID: {item.meetingId}</div>
        </div>
      ),
    },
    {
      header: 'Duration',
      render: (item) => (
        <span className="text-slate-700">{item.duration}</span>
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
      header: 'Status',
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.status === 'Complete'
              ? 'bg-green-100 text-green-700'
              : item.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: 'Participants',
      render: (item) => {
        // Show 4 avatars as per design, then show remaining count
        const visibleAvatars = item.participantAvatars.slice(0, 4);
        const remainingCount = item.participants - 4;

        return (
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {visibleAvatars.map((avatarUrl, index) => (
                <img
                  key={index}
                  src={avatarUrl}
                  alt={`Participant ${index + 1}`}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=User${index + 1}&background=6366f1&color=fff&size=128`;
                  }}
                />
              ))}
              {remainingCount > 0 && (
                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-white flex items-center justify-center -ml-2">
                  <span className="text-xs text-white font-semibold">
                    {remainingCount}+
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Action',
      render: () => (
        <Button
          size="sm"
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white w-10 h-10 p-0"
        >
          <Video className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      {/* Title Section */}
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">My Huddles</h1>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        {/* Search and Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name, email, domain and plan"
              className="pl-10 border-slate-200 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="border-slate-200 flex-1 sm:flex-initial">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-slate-200 flex-1 sm:flex-initial">
              Export CSV
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <CommonTable columns={columns} data={paginatedData} />

        {/* Pagination */}
        <CommonPagination
          totalItems={filteredData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default CoachHuddles;
