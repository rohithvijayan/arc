export const santizeUrl = (url:string)=>{
    const urlPattern = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/gi;
    const match =urlPattern.exec(url);
    if (url==="browse.me")  return url;
    if(match){
        const domain = match[1];
        const protocol = url.startsWith('https') ? 'https://' : 'http://';
        
        return `${protocol}${domain}`
    }
    return url;
}

