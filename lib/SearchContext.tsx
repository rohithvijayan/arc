"use client";
import { WebviewTag } from "electron";
import React, { createContext, useRef, useState ,MutableRefObject} from "react";
export interface SearchContextInterface {
  searchUrl: string;
  setSearchUrl: (url: string) => void;
  webviewRef:MutableRefObject<WebviewTag| null>;
}
export const SearchBarContext = createContext<SearchContextInterface | null>(
  null
);

export const SearchBarProvider = ({children,}: Readonly<{children: React.ReactNode;}>) => {
  const [searchUrl, setSearchUrl] = useState("browse.me");
  const webviewRef = useRef<WebviewTag>(null);
    
  const searchValue: SearchContextInterface = {
    searchUrl,
    setSearchUrl,
    webviewRef,
  };
  return (
    <SearchBarContext.Provider value={searchValue}>
      {children}
    </SearchBarContext.Provider>
  );
};

