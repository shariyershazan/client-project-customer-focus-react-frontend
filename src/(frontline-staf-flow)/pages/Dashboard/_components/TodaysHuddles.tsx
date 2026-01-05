import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";

interface HuddleData {
  id: string;
  name: string;
  meetingId: string;
  duration: string;
  date: string;
  time: string;
  status: "Complete" | "Pending" | "Cancelled";
  participants: number;
  participantAvatars: string[];
}

const TodaysHuddles = () => {
  // Avatar Images Data
  const participantAvatars = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/men/44.jpg",
    "https://randomuser.me/api/portraits/men/68.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/men/91.jpg",
    "https://randomuser.me/api/portraits/men/12.jpg",
    "https://randomuser.me/api/portraits/men/25.jpg",
  ];

  // Today's Huddles Data 
  const todaysHuddlesData: HuddleData[] = [
    {
      id: "1",
      name: "Morning Meeting",
      meetingId: "123213",
      duration: "60min",
      date: "April 14, 2020",
      time: "5:20 PM",
      status: "Complete",
      participants: 8,
      participantAvatars: participantAvatars.slice(0, 4),
    },
    {
      id: "2",
      name: "Morning Meeting",
      meetingId: "123214",
      duration: "60min",
      date: "April 14, 2020",
      time: "5:20 PM",
      status: "Complete",
      participants: 8,
      participantAvatars: participantAvatars.slice(0, 4),
    },
    {
      id: "3",
      name: "Morning Meeting",
      meetingId: "123215",
      duration: "60min",
      date: "April 14, 2020",
      time: "5:20 PM",
      status: "Complete",
      participants: 8,
      participantAvatars: participantAvatars.slice(0, 4),
    },
    {
      id: "4",
      name: "Morning Meeting",
      meetingId: "123216",
      duration: "60min",
      date: "April 14, 2020",
      time: "5:20 PM",
      status: "Complete",
      participants: 8,
      participantAvatars: participantAvatars.slice(0, 4),
    },
  ];

  const columns: Column<HuddleData>[] = [
    {
      header: "Name",
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-900">{item.name}</div>
          <div className="text-xs text-slate-500">
            Meeting ID: {item.meetingId}
          </div>
        </div>
      ),
    },
    {
      header: "Duration",
      render: (item) => <span className="text-slate-700">{item.duration}</span>,
    },
    {
      header: "Date & Time",
      render: (item) => (
        <div>
          <div className="text-slate-900">{item.date}</div>
          <div className="text-xs text-slate-500">{item.time}</div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.status === "Complete"
              ? "bg-green-100 text-green-700"
              : item.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Participants",
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
                    (
                      e.target as HTMLImageElement
                    ).src = `https://ui-avatars.com/api/?name=User${
                      index + 1
                    }&background=6366f1&color=fff&size=128`;
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
      header: "Action",
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
    <div className="mt-10 space-y-6">
      <h3 className="text-xl font-bold text-slate-900">Today's Huddles</h3>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex justify-end items-center mb-6">
          <Button
            variant="outline"
            className="bg-[#8C23CC] hover:bg-[#761eb0] text-white border-0"
          >
            View All
          </Button>
        </div>
        <CommonTable columns={columns} data={todaysHuddlesData} />
      </div>
    </div>
  );
};

export default TodaysHuddles;
