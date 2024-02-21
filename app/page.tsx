import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
export default function Home() {
  return (
    <div className="h-screen w-screen border-[#5757E8] border-8">
        <div className="justify-items-center content-center ml-[300px]">
            <div className="flex flex-row space-x-2 m-10">
              <Input type="text" placeholder="Browse for me... !"/>
              <Button className="gap-1">
                search
                <ArrowRightIcon/>                
              </Button>
            </div>
        </div>
    </div>
  );
}
