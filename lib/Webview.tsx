import { useContext, useEffect, useRef } from "react";
import { WebviewTag } from "electron";
import { SearchBarContext, SearchContextInterface } from "./SearchContext";
interface UrlProp{
    src:string;
}
const WebView = ({src}:UrlProp)=>{
    const {webviewRef} = useContext(SearchBarContext) as SearchContextInterface;
    return <webview src={src} ref={webviewRef}  
    allowpopups
    nodeintegration
    plugins 
    style={{ width: '100%', height: '100%' }}/>;
        
}

export default WebView;