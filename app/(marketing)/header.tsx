import Image from "next/image";
import { ClerkLoading, ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClerkProvider } from "@clerk/nextjs";

export const Header = () => {
    return (
        <header className = "h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/SubanenGo.png" height={40} width={40} alt="Mascot" />
                    <h1 className="text-2xl font-extrabold text-red-500 tracking-wide">SubanenGo</h1>
                </div>
                <ClerkProvider>
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/"/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button size="lg" variant="ghost">
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
                </ClerkProvider>
            </div>
        </header>
    )
}