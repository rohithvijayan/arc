import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ReloadIcon,
    FileIcon,
    PlusIcon
} from '@radix-ui/react-icons';
import { Card, CardContent, CardHeader } from "./ui/card";
import { useState } from "react";
import { Url } from "url";
export default function Sidebar() {
    interface Tabs {
        name: string,
        url: string,

    }
    let tabObjs: Tabs[] = [{ name: 'new tab', url: '' }]
    const addTab = () => {
        tabObjs.push({ name: 'google', url: 'https://google.com' })
    }
    return (
        <header className="header">
            <nav className='nav'>
                <div className="p-[10px] flex flex-row gap-10 m-[5px]">
                    <h1 className="font-bold text-[20px]">arc</h1>
                    <div className="flex flex-row space-x-2">
                        <Button
                            variant="ghost"
                        >
                            <PlusIcon />
                        </Button>
                        <Button
                            variant="ghost"
                        >
                            <ArrowLeftIcon />
                        </Button>
                        <Button variant="ghost"><ArrowRightIcon /></Button>
                        <Button variant="ghost"><ReloadIcon /></Button>
                    </div>
                </div>
                <div className="m-5">
                    <Input type="text" className="bg-slate-400 rounded-lg border-2 focus:border-slate-500 " value={"https://google.com"} />
                    <div className="flex flex-row gap-1">
                        {["wa", "gm", "yt", "sp"].map((bookmark, index) => {
                            return (
                                <Card
                                    className="h-[55px] w-[55px] m-1 justify-items-center bg-slate-400 text-white border-transparent"
                                    key={index}
                                >
                                    <CardHeader className="h-[53px] w-[53px] rounded-lg text-center p-3 backdrop-blur-[30px]">
                                        {bookmark}
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                </div>
                <Card className="h-[50px] m-3 justify-items-center bg-slate-500 text-white border-transparent">
                    <CardHeader className="h-[49px] rounded-lg backdrop-blur-[30px] flex flex-row gap-2 p-3 leading-3">
                        <FileIcon height={20} width={20} />
                        <h1 className="font-bold">google</h1>
                    </CardHeader>
                </Card>
                <Card className="h-[50px] m-3 justify-items-center bg-slate-400 text-white border-transparent">
                    <CardHeader className="h-[49px] rounded-lg border-2 backdrop-blur-[30px] flex flex-row gap-2 p-3 leading-3">
                        <FileIcon height={20} width={20} />
                        <h1 className="font-bold">whatsapp</h1>
                    </CardHeader>
                </Card>
            </nav>
        </header>
    );
}