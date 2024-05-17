"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchBarContext, SearchContextInterface } from "@/lib/SearchContext";
import WebView from "@/lib/Webview";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React, { useContext, useEffect, useState } from "react";
import { validUrl } from "@/lib/validUrl";
import { santizeUrl } from "@/lib/santizeUrl";
import { generate } from "./actions";
import { readStreamableValue } from "ai/rsc";
import fetchSearch from '@/lib/fetchSearch';
import Markdown from "react-markdown";
import { MessageInferface } from "@/lib/types";
export default function Home() {
  const [browseMe, setBrowseMe] = useState<string>("");
  const { searchUrl, setSearchUrl } = useContext(
    SearchBarContext
  ) as SearchContextInterface;
  const [loading, setLoading] = useState(false);
  const [activeBrowseMe,setActiveBrowseMe] = useState(false);
  const [generatation,setGeneration] = useState<string>("");
  const handleSearchButton = () => {
    browseMe != "" && validUrl(browseMe) == true
      ? setSearchUrl(santizeUrl(browseMe))
      : setSearchUrl(`https://google.com/search?q=${browseMe}`);
  };
  
  const handleBrowse = async () => {
    setActiveBrowseMe(true);
    const searchResponse = await fetchSearch({browseMe:browseMe});
    const prompt=`
          You will be acting as a search engine curator. Your task is to take website data , extract relevant information, and create a curated summary in markdown format. Here are the steps to follow:

      1. Parse the Info data provided in the  website_info tags. This data contains information about a website, such as its title, description, content, and other metadata.

      <website_info>
      ${JSON.stringify(searchResponse?.knowledge_graph?.knowledge_graph_type)}
      ${JSON.stringify(searchResponse?.knowledge_graph?.type)}
      ${JSON.stringify(searchResponse?.knowledge_graph?.title)}
      ${JSON.stringify(searchResponse?.knowledge_graph?.description)}
      ${JSON.stringify(searchResponse?.knowledge_graph?.source)}
      ${JSON.stringify(searchResponse?.organic_results)}
      </website_info>

      2. Extract the most important and relevant information from the parsed JSON data. This may include the website's title, a brief description, key points from the content, and any other noteworthy details. 

      3. Curate the extracted information into a concise and informative summary in markdown format. Use appropriate markdown formatting such as headings, bullet points, and emphasis to structure and highlight the content.

      4. Limit the curated summary to a maximum of 500 characters. Focus on the most essential information and avoid including unnecessary details.


      Remember, your goal is to provide a clear, concise, and informative summary of the website based on the provided JSON data, while adhering to the 1000-character limit. Parse the data carefully, extract the most relevant information, and use effective markdown formatting to create a high-quality curated summary.
      And do not end with Note:
    `
    const { output } = await generate(prompt);
    for await (const delta of readStreamableValue(output)) {
      setGeneration((currentGeneration) => `${currentGeneration}${delta}`);
    }
  };
  return (
    <div className="h-screen w-screen border-[#5757E8] border-8">
      <div className="justify-center items-center ml-[290px] h-full">
        {searchUrl == "browse.me" ? (
          <div className="flex flex-col container">
            {activeBrowseMe==false ?             
            <div className="flex flex-row space-x-2 p-10">
              <Input
                type="text"
                onChange={(input) => {
                  setBrowseMe(input.target.value);
                }}
                onKeyUp={(event) => {
                  if (event.key == "Enter") {
                    handleSearchButton();
                  }
                }}
                placeholder="Browse for me... !"
              />
              <Button className="gap-1 " onClick={handleBrowse}>
                search
                <ArrowRightIcon />
              </Button>
            </div>:(
              loading==true ? 
              <h1>laoding</h1>:(
              <Markdown>
              {generatation}
             </Markdown>
              )
            )
            }
          </div>
        ) : (
          <WebView
            src={searchUrl == "browse.me" ? "https://google.com" : searchUrl}
          />
        )}
      </div>
    </div>
  );
}
