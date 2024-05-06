export interface Tabs {
    name: string;
    url: string;
    presentId: string;
  }

export interface WebDataInterface{
    message:{
        title:string,
        url:string,
        favicon:string,
        description:string,
        heightLights:Array<string>,
        image:Array<string>
    }
}