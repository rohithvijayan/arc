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
export interface SearchDataInferface{
    title:string;
    summary:string;
    highLights:Array<string>;
    imageSet:Array<string>;
    videoSet?:Array<string>;
}

export interface MessageInferface {
    role: 'assistant';
    content: string;
    display?: React.ReactNode;
}