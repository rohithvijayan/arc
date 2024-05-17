import { useContext, useEffect} from "react";
import { WebviewTag } from "electron";
import { SearchBarContext, SearchContextInterface } from "./SearchContext";
interface UrlProp {
  src: string;
}
const WebView = ({ src }: UrlProp) => {
  const { webviewRef,setSearchUrl } = useContext(SearchBarContext) as SearchContextInterface;
  useEffect(()=>{
    const currentWebview = webviewRef.current;
    const handleNavigate = async () => {
        const url = await currentWebview?.getURL();
        console.log("src",url);
        setSearchUrl(url || "");
      };
        currentWebview?.addEventListener("did-navigate", handleNavigate);
        currentWebview?.addEventListener("did-navigate-in-page", handleNavigate);

      return () => {
        currentWebview?.addEventListener("did-navigate", handleNavigate);
        currentWebview?.addEventListener("did-navigate-in-page", handleNavigate);
      };
  },[src])
  return (
    <webview
      src={src}
      ref={webviewRef}
      allowpopups
      nodeintegration
      plugins
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default WebView;
