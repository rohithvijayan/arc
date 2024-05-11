"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useState, useEffect, useRef, useContext } from "react";
import { SearchBarContext, SearchContextInterface } from "@/lib/SearchContext";
import { validUrl } from "@/lib/validUrl";
import { santizeUrl } from "@/lib/santizeUrl";
import { v4 } from "uuid";
import Image from "next/image";
import fetchMeta from "@/lib/fetchMeta";
import { WebDataInterface } from "@/lib/types";
import { generate } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";
import { ScrollArea } from "./ui/scroll-area";
import Markdown from "react-markdown";
export default function Spotlight() {
  const { activeTab, setActiveTab, setSearchUrl } = useContext(
    SearchBarContext
  ) as SearchContextInterface;
  const [spotlight, setSpotlight] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [webData, setWebData] = useState<WebDataInterface>();
  const [loading, setLoading] = useState(false);
  const [generation, setGeneration] = useState<string>("");
  const handleSpotLightRef = useRef<(event: KeyboardEvent) => void>();
  // if(activeTab.name!==""){
  //   fetchMeta(activeTab.url).then(data=>setActiveTab({name:data.title,url:data.url,presentId:v4()}))
  // }
  const handleFetchAPI = async () => {
    setGeneration("");
    console.log("handle called");
    setLoading(true);
    const response = await fetchMeta(activeTab.url);
    console.log(response);
    setWebData(response);
    setLoading(false);
    if (response) {
      const prompt = `
      You're an AI assistant which summarizes the website contents \
      Here is the JSON data for the website to summarize:
      <website_data>
      ${response?.message.title}
      ${response?.message.heightLights}
      </website_data>

      Please carefully review and analyze the provided JSON data. Pay close attention to key elements such as the page title, headings, paragraphs, and any available metadata that gives insight into the website's content and purpose.

      Based on your analysis, write a concise summary of the main content and overall purpose of the website. Provide your summary in markdown format with formatting. Use complete sentences and keep the total summary under 500 characters.

      Next, identify the major points or key topics covered on the website. List out these points in a markdown bullet list format.

      For both the summary and list of major points, focus on extracting and conveying the most essential, high-level information about the website. Be selective and keep your writing clear and concise.

      Please provide the content summary first, followed by the list of major points.
     `;
      console.log(prompt);
      const { output } = await generate(prompt);

      for await (const delta of readStreamableValue(output)) {
        setGeneration((currentGeneration) => `${currentGeneration}${delta}`);
      }
    }
  };
  useEffect(() => {
    const handleSpotLight = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "t") {
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
          <Input
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            onKeyUp={(event) => {
              let finalUrl;
              if (event.key == "Enter") {
                validUrl(search) == true
                  ? (finalUrl = santizeUrl(search))
                  : (finalUrl = `https://google.com/search?q=${search}`);
                setSearchUrl(finalUrl);
                setActiveTab({
                  name: finalUrl,
                  url: finalUrl,
                  presentId: v4(),
                });
                setSpotlight(false);
              }
            }}
            placeholder="Search...."
            className=""
          />
        </DialogHeader>

        <Card className="rounded-sm">
          <CardContent className={`flex flex-col h-full`}>
            <ScrollArea className={generation === "" ? `h-20` : "h-[500px]"}>
              <div className="flex flex-row justify-between items-center gap-4 container mx-auto p-3">
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">Summarize with AI</h1>
                  <p className="text-gray-500">{activeTab.url}</p>
                </div>
                {activeTab.url !== "browse.me" && (
                  <Button onClick={handleFetchAPI} type="submit">
                    {loading == false ? "Ask" : "Loading.."}
                  </Button>
                )}
              </div>
              {webData && (
                <div className="flex flex-col">
                  <div className="grid grid-row-3 grid-flow-col">
                    {webData.message.image.map((img) => {
                      return (
                        <Image
                          alt="images"
                          src={img}
                          height={100}
                          width={100}
                          className="h-[300px] w-full object-contain rounded"
                        />
                      );
                    })}
                  </div>
                  <Markdown>{generation}</Markdown>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
