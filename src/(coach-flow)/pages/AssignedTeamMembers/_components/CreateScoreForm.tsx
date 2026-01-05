import { useState } from "react";
import { Mail, Phone, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface HabitEntry {
  id: string;
  name: string;
  description: string;
}

export interface ScoreFormData {
  empathy: number;
  communication: number;
  problemSolving: number;
  toneOfVoice: number;
  feedbackNotes: string;
  improvementTips: string;
  habits: HabitEntry[];
}

interface CreateScoreFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScoreFormData) => void;
  teamMember: {
    id: string;
    name: string;
    avatar: string;
    email?: string;
    phone?: string;
    habitsPercentage: number;
  };
}

// Helper function to generate unique IDs
const generateId = () => {
  return Math.random().toString(36).substring(7);
};

const CreateScoreForm = ({
  isOpen,
  onClose,
  onSubmit,
  teamMember,
}: CreateScoreFormProps) => {
  // Use function initializer to avoid calling Math.random() during render
  const [formData, setFormData] = useState<ScoreFormData>(() => ({
    empathy: 1,
    communication: 1,
    problemSolving: 1,
    toneOfVoice: 1,
    feedbackNotes: "",
    improvementTips: "",
    habits: [
      {
        id: generateId(),
        name: "",
        description: "",
      },
    ],
  }));

  const addHabit = () => {
    setFormData({
      ...formData,
      habits: [
        ...formData.habits,
        {
          id: generateId(),
          name: "",
          description: "",
        },
      ],
    });
  };

  const removeHabit = (id: string) => {
    setFormData({
      ...formData,
      habits: formData.habits.filter((habit) => habit.id !== id),
    });
  };

  const updateHabit = (
    id: string,
    field: "name" | "description",
    value: string
  ) => {
    setFormData({
      ...formData,
      habits: formData.habits.map((habit) =>
        habit.id === id ? { ...habit, [field]: value } : habit
      ),
    });
  };

  const resetForm = () => {
    setFormData({
      empathy: 1,
      communication: 1,
      problemSolving: 1,
      toneOfVoice: 1,
      feedbackNotes: "",
      improvementTips: "",
      habits: [
        {
          id: generateId(),
          name: "",
          description: "",
        },
      ],
    });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    resetForm();
    onClose();
  };

  // Progress circle data
  const progressData = [
    { name: "Completed", value: teamMember.habitsPercentage },
    { name: "Remaining", value: 100 - teamMember.habitsPercentage },
  ];
  const COLORS = ["#10b981", "#e5e7eb"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" max-w-6xl mx-auto w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Create Score & Habits
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Fill up all the form
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Information Section */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-slate-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Left: Profile Picture and Contact Info */}
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <img
                  src={teamMember.avatar}
                  alt={teamMember.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-slate-200 shrink-0"
                  onError={(e) => {
                    (
                      e.target as HTMLImageElement
                    ).src = `https://randomuser.me/api/portraits/men/32.jpg`;
                  }}
                />
                {/* Contact Information */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2 truncate">
                    {teamMember.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <span className="truncate">
                        {teamMember.email || "alma.lawson@example.com"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <span className="truncate">
                        {teamMember.phone || "+8801787939177"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Progress Indicator */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={progressData}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={32}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                      >
                        {progressData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <p className="text-xs sm:text-sm font-bold text-green-600 leading-none">
                        {teamMember.habitsPercentage}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs sm:text-sm text-slate-900">Habit</p>
                  <p className="text-xs sm:text-sm text-slate-900">Completed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Score Section */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-slate-200">
            <div className="space-y-3 sm:space-y-4">
              {/* Empathy */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <label className="text-sm font-medium text-slate-900 shrink-0">
                  Empathy:
                </label>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="empathy"
                        value={value}
                        checked={formData.empathy === value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            empathy: parseInt(e.target.value),
                          })
                        }
                        className="w-4 h-4 text-[#8C23CC] border-slate-300 focus:ring-[#8C23CC] accent-[#8C23CC]"
                      />
                      <span className="ml-1 text-sm text-slate-700">
                        {value}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Communication */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <label className="text-sm font-medium text-slate-900 shrink-0">
                  Communication:
                </label>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="communication"
                        value={value}
                        checked={formData.communication === value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            communication: parseInt(e.target.value),
                          })
                        }
                        className="w-4 h-4 text-[#8C23CC] border-slate-300 focus:ring-[#8C23CC] accent-[#8C23CC]"
                      />
                      <span className="ml-1 text-sm text-slate-700">
                        {value}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Problem Solving */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <label className="text-sm font-medium text-slate-900 shrink-0">
                  Problem Solving:
                </label>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="problemSolving"
                        value={value}
                        checked={formData.problemSolving === value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            problemSolving: parseInt(e.target.value),
                          })
                        }
                        className="w-4 h-4 text-[#8C23CC] border-slate-300 focus:ring-[#8C23CC] accent-[#8C23CC]"
                      />
                      <span className="ml-1 text-sm text-slate-700">
                        {value}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tone of Voice */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <label className="text-sm font-medium text-slate-900 shrink-0">
                  Tone of Voice:
                </label>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="toneOfVoice"
                        value={value}
                        checked={formData.toneOfVoice === value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            toneOfVoice: parseInt(e.target.value),
                          })
                        }
                        className="w-4 h-4 text-[#8C23CC] border-slate-300 focus:ring-[#8C23CC] accent-[#8C23CC]"
                      />
                      <span className="ml-1 text-sm text-slate-700">
                        {value}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Feedback notes
            </label>
            <textarea
              placeholder="Feedback Notes"
              value={formData.feedbackNotes}
              onChange={(e) =>
                setFormData({ ...formData, feedbackNotes: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C23CC] focus:border-transparent min-h-[100px] resize-none"
            />
          </div>

          {/* Improvement Tips */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Improvement Tips
            </label>
            <textarea
              placeholder="Improvement Tips"
              value={formData.improvementTips}
              onChange={(e) =>
                setFormData({ ...formData, improvementTips: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C23CC] focus:border-transparent min-h-[100px] resize-none"
            />
          </div>

          {/* Habit Entry Sections */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h4 className="text-base font-semibold text-slate-900">Habits</h4>
              <Button
                type="button"
                onClick={addHabit}
                className="bg-[#8C23CC] hover:bg-[#761eb0] text-white w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Habit
              </Button>
            </div>
            <div className="space-y-4">
              {formData.habits.map((habit, index) => (
                <div
                  key={habit.id}
                  className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h5 className="text-sm font-semibold text-slate-900">
                      Habit {index + 1}
                    </h5>
                    {formData.habits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHabit(habit.id)}
                        className="p-1 hover:bg-red-50 rounded transition-colors"
                        aria-label="Remove habit"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Habit Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter Huddle Name"
                        value={habit.name}
                        onChange={(e) =>
                          updateHabit(habit.id, "name", e.target.value)
                        }
                        className="border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Habit Description
                      </label>
                      <textarea
                        placeholder="Enter Habit Description"
                        value={habit.description}
                        onChange={(e) =>
                          updateHabit(habit.id, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C23CC] focus:border-transparent min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-slate-200 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#8C23CC] hover:bg-[#761eb0] text-white w-full sm:w-auto"
            >
              Save and Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateScoreForm;
