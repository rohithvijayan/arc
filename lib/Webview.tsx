import { useEffect, useRef } from "react";
import { WebviewTag } from "electron";
interface UrlProp{
    src:string;
}
const WebView = ({src}:UrlProp)=>{
    const webviewRef = useRef<WebviewTag>(null);
    
    return <webview src={src} ref={webviewRef}  
    allowpopups
    nodeintegration
    plugins 
    style={{ width: '100%', height: '100%' }}/>;
        
}

export default WebView;