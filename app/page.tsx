"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WebView from "@/lib/Webview";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="h-screen w-screen border-[#5757E8] border-8">
        <div className="justify-center items-center ml-[290px] h-full">
            {/* <div className="flex flex-row space-x-2 m-10">
              <Input type="text" placeholder="Browse for me... !"/>
              <Button className="gap-1">
                search
                <ArrowRightIcon/>                
              </Button>
            </div> */}
            <WebView src="https://www.google.com"/>
        </div>
    </div>
  );
}
