export const validUrl = (url:string) =>{
    const expression =  /^(?:(?:https?:\/\/)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(?:\/.*)?$/i;
    return expression.test(url);
}