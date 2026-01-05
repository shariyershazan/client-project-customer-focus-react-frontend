import { useState, useRef } from "react";
import { Upload, FileText, Trash2 } from "lucide-react";
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

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress?: number;
}

export interface SessionFormData {
  title: string;
  dateTime: string;
  duration: string;
  agenda: string;
}

interface CreateSessionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SessionFormData, files: UploadedFile[]) => void;
}

const CreateSessionForm = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateSessionFormProps) => {
  const [formData, setFormData] = useState<SessionFormData>({
    title: "",
    dateTime: "",
    duration: "",
    agenda: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const fileSize = (file.size / 1024).toFixed(0) + "KB";
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: fileSize,
          progress: 100,
        };
        setUploadedFiles((prev) => [...prev, newFile]);
      });
    }
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, uploadedFiles);
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({ title: "", dateTime: "", duration: "", agenda: "" });
    setUploadedFiles([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Create Sessions
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Fill up all the form
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session Title */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Session Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Session Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="border-slate-200"
            />
          </div>

          {/* Select Date & Time */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Select Date & Time <span className="text-red-500">*</span>
            </label>
            <Input
              type="datetime-local"
              placeholder="Select Date & Time"
              value={formData.dateTime}
              onChange={(e) =>
                setFormData({ ...formData, dateTime: e.target.value })
              }
              required
              className="border-slate-200"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Duration <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
              className="border-slate-200"
            />
          </div>

          {/* Agenda */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Agenda <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Agenda"
              value={formData.agenda}
              onChange={(e) =>
                setFormData({ ...formData, agenda: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C23CC] focus:border-transparent min-h-[100px] resize-none"
            />
          </div>

          {/* Upload Materials */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Upload Materials <span className="text-red-500">*</span>
            </label>
            <div
              className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#8C23CC] transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="text-sm text-slate-600">
                Drag and drop or{" "}
                <span className="text-[#8C23CC] font-semibold cursor-pointer">
                  browse
                </span>
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="w-5 h-5 text-red-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-slate-500">{file.size}</p>
                          {file.progress !== undefined && (
                            <div className="flex-1 max-w-[200px] h-1 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#8C23CC] transition-all"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-1 hover:bg-red-50 rounded transition-colors"
                      aria-label="Delete file"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#8C23CC] hover:bg-[#761eb0] text-white"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionForm;

