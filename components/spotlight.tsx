"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useState, useEffect, useRef, useContext } from "react";
import { SearchBarContext, SearchContextInterface } from "@/lib/SearchContext";
import { validUrl } from "@/lib/validUrl";
import { santizeUrl } from "@/lib/santizeUrl";
export default function Spotlight() {
  const {setSearchUrl} = useContext(SearchBarContext) as SearchContextInterface;
  const [spotlight, setSpotlight] = useState(false);
  const [search,setSearch] = useState<string>("");
  const handleSpotLightRef = useRef<(event: KeyboardEvent) => void>();
  useEffect(() => {
    const handleSpotLight = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setSpotlight((prevState) => !prevState);
      }
    };

    handleSpotLightRef.current = handleSpotLight;
    window.addEventListener("keydown", handleSpotLight);

    return () => {
      window.removeEventListener("keydown", handleSpotLightRef.current!);
    };
  }, []);
  return (
    <Dialog open={spotlight} onOpenChange={setSpotlight}>
      <DialogContent className="p-3">
        <DialogHeader>
          <Input onChange={(event)=>{setSearch(event.target.value)}}
          onKeyUp={(event) => {
            if (event.key == "Enter") {
              validUrl(search) == true
                ? setSearchUrl(santizeUrl(search))
                : setSearchUrl(
                    `https://google.com/search?q=${search}`
                  );
               setSpotlight(false);
            }
          }}
           placeholder="Search...." className="" />
        </DialogHeader>
        <Card className="rounded-sm">
          <CardContent className="h-15 flex flex-row justify-evently gap-4 p-3 leading-7">
            <h1 className="text-lg font-medium">Youtube</h1>
            <p className="text-gray-500">https://youtube.com</p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
