export const santizeUrl = (url:string)=>{
    const urlPattern = /^(https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)(.*)$/gi;
    const match =urlPattern.exec(url);
    if (url==="browse.me")  return url;
    if (match) {
        const protocol = match[1] ? match[1] : "http://";
        const domain = match[2];
        const path = match[3] ? match[3] : "";
        return `${protocol}${domain}${path}`;
      }
    return url;
}

