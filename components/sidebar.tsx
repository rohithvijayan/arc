import { Button } from "./ui/button";
import {ArrowLeftIcon, 
        ArrowRightIcon,
        ReloadIcon,
        FileIcon
    } from '@radix-ui/react-icons';
import { Card, CardHeader } from "./ui/card";
export default function Sidebar(){
    return(
        <header className="bg-red-500 header">
            <nav className='bg-red-500 nav'>
                <div className="p-[10px] flex flex-row gap-20 m-[5px]">
                    <h1 className="font-bold text-[20px]">arc</h1>
                    <div className="flex flex-row space-x-2">
                        <Button 
                            variant="ghost"
                        >
                            <ArrowLeftIcon/>
                        </Button>
                        <Button variant="ghost"><ArrowRightIcon/></Button>
                        <Button variant="ghost"><ReloadIcon/></Button>
                    </div>
                </div>
            <Card className="dark m-3 hover:bg-red-500 h-[50px]">
                <CardHeader className="flex flex-row gap-2 p-3 leading-3">
                    <FileIcon height={20} width={20}/>
                    <h1 className="font-bold">new tab</h1>
                </CardHeader>
            </Card>
            </nav>
        </header>
    );
}