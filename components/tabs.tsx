import React, { useContext } from "react";
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
}
const TabComponent = ({tab,setTabID,setSideBarSearch,setSearchUrl,tabID,defaultTabStyle,activeTabStyle,}: TabProps) => {
  const {tabObjs,setTabObjs} = useContext(SearchBarContext) as SearchContextInterface;
  console.log(tab);
  const handleClose = ()=>{
    setTabObjs((prevTabs)=>prevTabs.filter((tab)=>tab.presentId!==tabID));
  }
  return (
    <div
      onClick={() => {
        setTabID(tab.presentId);
        setSideBarSearch(tab.url);
        setSearchUrl(tab.url);
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
          <CgClose onClick={handleClose} size={15} className="invisible group-hover:visible"/>
        </CardHeader>
      </Card>
    </div>
  );
};
export default TabComponent;
