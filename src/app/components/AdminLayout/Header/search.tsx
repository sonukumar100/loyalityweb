import { Button } from 'app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'app/components/ui/dialog';
import { Input } from 'app/components/ui/input';
import { Label } from 'app/components/ui/label';
import { ScrollArea } from 'app/components/ui/scroll-area';
import { Separator } from 'app/components/ui/separator';
import { Search } from 'lucide-react';

export function Searchheader() {
  return (
    <Dialog>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[60rem] p-0 border-0 overflow-hidden  backdrop-blur-[3rem] bg-[#fff] ">
        <div className="">
          <div className="">
            <Input
              id="name"
              placeholder="Type a command or search..."
              className="text-white rounded-t-[.6rem] border-b-0  outline-none backdrop-blur-[3rem] bg-[#fff] placeholder:text-[#000]"
            />
          </div>
          <div className="">
            <ScrollArea className="h-80 w-full rounded-t-0 rounded-b-[.6rem] border ">
              <ul className="list-none space-y-8 mt-2 p-6 text-black">
                <li>Documentation</li>
                <li>Components</li>
                <li>Now this is a story</li>
                <li>Now tComponents</li>
                <li>Documentation</li>
                <li>Components</li>
                <li>Now this is a story</li>
                <li>Now tComponents</li>
              </ul>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
