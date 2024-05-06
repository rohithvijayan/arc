"use client";
import React, { useContext, useState,MutableRefObject } from "react";
import {WebviewTag} from 'electron'
import { Card, CardHeader } from "./ui/card";
import { FileIcon } from "@radix-ui/react-icons";
import { Tabs } from "@/lib/types";
import { CgClose } from "react-icons/cg";
import { SearchBarContext,SearchContextInterface } from "@/lib/SearchContext";
interface TabProps {
  tab: Tabs;
  tabID: string;
  setTabID: React.Dispatch<React.SetStateAction<string>>;
  setSideBarSearch: React.Dispatch<React.SetStateAction<string>>;
  setSearchUrl: (url: string) => void;
  defaultTabStyle: string;
  activeTabStyle: string;
  webRef:MutableRefObject<WebviewTag| null>
}
const TabComponent = ({tab,setTabID,setSideBarSearch,setSearchUrl,tabID,defaultTabStyle,activeTabStyle,webRef}: TabProps) => {
  const {tabObjs,setTabObjs} = useContext(SearchBarContext) as SearchContextInterface;
  const {setActiveTab} = useContext(SearchBarContext) as SearchContextInterface
  const handleClose = ()=>{
    setTabObjs((prevTabs)=>prevTabs.filter((tab)=>tab.presentId!==tabID));
    
    setSearchUrl("");
    setSideBarSearch("");
    webRef.current?.clearHistory();
  }
  return (
    <div
      onClick={() => {
        setTabID(tab.presentId);
        setSideBarSearch(tab.url);
        setSearchUrl(tab.url);
        setActiveTab(tab);
      }}
    >
      <Card
        className={`m-3 justify-items-center text-white cursor:pointer ${
          tab.presentId != tabID ? defaultTabStyle : activeTabStyle
        }`}
        key={tab.presentId}
      >
        <CardHeader className="group rounded-lg flex flex-row justify-between gap-2 p-3 leading-3">
          <div className="flex flex-row justify-evently gap-2">
          <FileIcon height={20} width={20} />
          <p className="text-base  font-medium">{tab.name}</p>
          </div>
          <CgClose onClick={()=>{handleClose()}} size={15} className="invisible group-hover:visible"/>
        </CardHeader>
      </Card>
    </div>
  );
};
export default TabComponent;
