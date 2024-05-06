"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchBarContext, SearchContextInterface } from "@/lib/SearchContext";
import WebView from "@/lib/Webview";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React, { useContext, useState } from "react";
import { validUrl } from "@/lib/validUrl";
import { santizeUrl } from "@/lib/santizeUrl";
import useFetchSiteData from "@/lib/hooks/useFetchSiteData";

export default function Home() {
  const [browseMe,setBrowseMe] = useState<string>("");
  const { searchUrl,setSearchUrl } = useContext(SearchBarContext) as SearchContextInterface;
  
  const handleSearchButton = ()=>{
    browseMe!="" && validUrl(browseMe)==true ? setSearchUrl(santizeUrl(browseMe)) : setSearchUrl(`https://google.com/search?q=${browseMe}`);
  }
  return (
    <div className="h-screen w-screen border-[#5757E8] border-8">
      <div className="justify-center items-center ml-[290px] h-full">
        {searchUrl == "browse.me" ? (
          <div className="flex flex-row space-x-2 p-10">
            <Input type="text"  onChange={(input)=>{
              setBrowseMe(input.target.value);
            }} placeholder="Browse for me... !" />
            <Button className="gap-1 " onClick={handleSearchButton}>
              search
              <ArrowRightIcon />
            </Button>
          </div>
        ) : (
          <WebView src={searchUrl=='browse.me' ? 'https://google.com' : searchUrl} />
        )}
      </div>
    </div>
  );
}
