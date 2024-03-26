export const validUrl = (url:string) =>{
    const expression =  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
    return expression.test(url);
}