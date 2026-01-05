/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { Upload, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import type { SessionFormData, UploadedFile } from "@/(coach-flow)/pages/SessionsManagement/_components/CreateSessionForm";

interface CreateSessionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SessionFormData, files: UploadedFile[]) => void;
  initialData?: SessionFormData; // NEW PROP
}

export const CreateSessionForm = ({ isOpen, onClose, onSubmit, initialData }: CreateSessionFormProps) => {
  const [formData, setFormData] = useState<SessionFormData>({ title: "", dateTime: "", duration: "", agenda: "" });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync data when initialData changes (Edit mode)
  useEffect(() => {
    if (initialData) {
      // setFormData(initialData);
    } else {
      // setFormData({ title: "", dateTime: "", duration: "", agenda: "" });
    }
  }, [initialData, isOpen]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(f => ({
        id: Math.random().toString(),
        name: f.name,
        size: (f.size / 1024).toFixed(0) + "KB",
        progress: 100
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  return (
 <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-2xl w-full max-h-[90vh] flex flex-col border-none rounded-2xl shadow-2xl p-0 overflow-hidden">
    
    {/* HEADER */}
    <div className="bg-[#F8FAFC] p-6 border-b border-slate-100">
      <DialogHeader className="space-y-1">
        <DialogTitle className="text-2xl font-extrabold text-slate-900">
          {initialData ? "Edit Session" : "Create Session"}
        </DialogTitle>
        <DialogDescription className="text-slate-500 font-medium italic">
          Please provide the session details below.
        </DialogDescription>
      </DialogHeader>
    </div>

    {/* SCROLLABLE BODY */}
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData, uploadedFiles)
      }}
      className="flex-1 overflow-y-auto p-8 space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
            Session Title *
          </label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Sales Strategy Workshop"
            required
            className="h-12 border-slate-200 focus:border-[#8C23CC]"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
            Date & Time *
          </label>
          <Input
            type="datetime-local"
            value={formData.dateTime}
            onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
            required
            className="h-12 border-slate-200"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
            Duration *
          </label>
          <Input
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g. 60 mins"
            required
            className="h-12 border-slate-200"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
          Agenda *
        </label>
        <textarea
          value={formData.agenda}
          onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#8C23CC]/20 outline-none h-32 resize-none"
          placeholder="Describe the session goals..."
        />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
          Materials
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-[#8C23CC] hover:bg-purple-50/30 transition-all cursor-pointer group"
        >
          <Upload className="mx-auto text-slate-400 group-hover:text-[#8C23CC] mb-2" />
          <p className="text-sm font-semibold text-slate-600">
            Click to upload or drag files
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            multiple
          />
        </div>

        {uploadedFiles.map((file) => (
          <div
            key={file.id}
            className="mt-3 flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100"
          >
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[#8C23CC]" />
              <span className="text-sm font-medium text-slate-700">
                {file.name}
              </span>
            </div>
            <Trash2
              size={16}
              className="text-red-400 cursor-pointer hover:text-red-600"
              onClick={() =>
                setUploadedFiles((prev) =>
                  prev.filter((f) => f.id !== file.id)
                )
              }
            />
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="h-12 px-8 font-bold text-slate-600 border-slate-200"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="h-12 px-10 font-bold bg-[#8C23CC] text-white hover:bg-[#761eb0]"
        >
          {initialData ? "Save Changes" : "Create Session"}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

  );
};