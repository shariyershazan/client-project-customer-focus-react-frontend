import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateHuddleDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[420px]">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Create Huddle</DialogTitle>
          <DialogDescription>
            Fill up all the form
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Topic *</Label>
            <Input placeholder="Enter Huddle Topic" />
          </div>

          <div className="space-y-1">
            <Label>Select Duration *</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 min</SelectItem>
                <SelectItem value="60">60 min</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Select Participants *</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select participants" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="michael">Michael</SelectItem>
                <SelectItem value="anna">Anna</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">
            Cancel
          </Button>
          <Button className="bg-[#8C23CC] hover:bg-[#761eb0] text-white cursor-pointer">
            Create Huddle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHuddleDialog;
