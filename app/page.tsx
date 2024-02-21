import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen border-black border-8">
        <div className="justify-items-center content-center ml-[300px]">
            <div className="flex flex-row space-x-2 m-10">
              <Input type="text" placeholder="Browse for me... !"/>
              <Button>search</Button>
            </div>
        </div>
    </div>
  );
}
