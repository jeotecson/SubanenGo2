import { cn } from "@/lib/utils";
import  Link from "next/link";
import Image from "next/image";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoading, ClerkLoaded, UserButton, } from "@clerk/nextjs"
import { Loader } from "lucide-react"

type Props = {
    className?: string;
};

export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
            <Link href="/learn">
            <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                <Image src="/SubanenGo.png" height={40} width={40} alt="Mascot" />
                <h1 className="text-2xl font-extrabold text-red-500 tracking-wide">SubanenGo</h1>
            </div>
            </Link> 
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label={"Learn"} iconSrc={"/learn.png"} href={"/learn"} />
                <SidebarItem label={"Leaderboard"} iconSrc={"/leaderboard.png"} href={"/leaderboard"} />
                <SidebarItem label={"Quests"} iconSrc={"/quest.png"} href={"/quests"} />
                <SidebarItem label={"Modules"} iconSrc={"/module.png"} href={"/modules"} />
                <SidebarItem label={"Shop"} iconSrc={"/shop.png"} href={"/shop"} />
                <div className="p-4">
                    <ClerkLoading>
                        <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                    </ClerkLoading>
                    <ClerkLoaded>
                        <UserButton afterSignOutUrl="/"/>
                    </ClerkLoaded>
                </div>
            </div>
        </div>
    );
};