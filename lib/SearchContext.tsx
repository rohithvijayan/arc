"use client";
import { WebviewTag } from "electron";
import React, { createContext, useRef, useState ,MutableRefObject} from "react";
import { Tabs } from "./types";
export interface SearchContextInterface {
  searchUrl: string,
  setSearchUrl: (url: string) => void,
  webviewRef:MutableRefObject<WebviewTag| null>,
  tabObjs:Tabs[],
  setTabObjs:React.Dispatch<React.SetStateAction<Tabs[]>>,
  activeTab:Tabs,
  setActiveTab:React.Dispatch<React.SetStateAction<Tabs>>
}
export const SearchBarContext = createContext<SearchContextInterface | null>(
  null
);

export const SearchBarProvider = ({children,}: Readonly<{children: React.ReactNode;}>) => {
  const [searchUrl, setSearchUrl] = useState("browse.me");
  const webviewRef = useRef<WebviewTag>(null);
  const [tabObjs, setTabObjs] = useState<Tabs[]>([
    { name: "browse.me", url: "browse.me", presentId: "" },
  ]);
  const [activeTab,setActiveTab] =useState(tabObjs[0]);
  const searchValue: SearchContextInterface = {
    searchUrl,
    setSearchUrl,
    webviewRef,
    tabObjs,
    setTabObjs,
    activeTab,
    setActiveTab
  };
  return (
    <SearchBarContext.Provider value={searchValue}>
      {children}
    </SearchBarContext.Provider>
  );
};

