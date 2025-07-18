"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { refillHearts } from "@/actions/user-progress"
import { toast } from "sonner";
import { createStripeUrl } from "@/actions/user-subscription";
import { POINTS_TO_REFILL } from "@/constants";


type Props = {
    hearts: number;
    points: number;
    hasActiveSubscriptions: boolean;
};

export const Items = ({
    hearts, 
    points, 
    hasActiveSubscriptions,
}: Props) => {
    const [pending, startTransition] = useTransition();

    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
            return;
    }

    startTransition(() => {
        refillHearts().catch(() => toast.error("Something went wrong"))
    });
    };

    //For the shop subscription
    const onUpgrade = () => {
        startTransition(() => {
            createStripeUrl().then((response) => {
                if(response.data) {
                    window.location.href = response.data;
                }
            }).catch(() => toast.error("Something went wrong"))
        });
    };

    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image src="/heart.png" alt="Heart" height={60} width={60}/>
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refill hearts
                    </p>
                </div>
                <Button 
                onClick={onRefillHearts}
                disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}>
                    {hearts === 5 ? "full" : (
                        <div className="flex items-center">
                            <Image 
                                src="/points.png" 
                                alt="Points" 
                                height={20} 
                                width={20}
                            />
                            <p>
                                {POINTS_TO_REFILL}
                            </p>
                        </div>
                    )}
                </Button>
            </div>
            {/* For the shop subscription */}
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
                <Image src="/unlimited.png" alt="Unlimited" height={60} width={60}/>
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimited hearts
                    </p>
                </div>
                <Button onClick={onUpgrade} disabled={pending}>
                    {hasActiveSubscriptions ? "settings" : "upgrade"}
                </Button>
            </div>
        </ul>
    );
};