import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Items } from "./items";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

const ShopPage = async () => {
    const userProgressData = getUserProgress();
    //For the shop subscription
    const userSubscriptionData = getUserSubscription();

    const [
        userProgress,
        //For the shop subscription
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        //For the shop subscription
        userSubscriptionData

    ])

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }

    //For the shop subscription. 
    const isPro = !!userSubscription?.isActive

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">   
            <StickyWrapper>
                <UserProgress 
                    activeCourse = {userProgress.activeCourse}
                    hearts = {userProgress.hearts}
                    points = {userProgress.points}
                    //For the shop subscription. Orginal is {false}
                    hasActiveSubscriptions = {isPro}
                />
                {/* For the shop susbcription */}
                    {!isPro && (
                    <Promo />
                )}
                <Quests points={userProgress.points} />
                
            </StickyWrapper>  

            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="/shop.png" alt="Shop" height={90} width={90}/>
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points on new items and upgrades!
                    </p>
                    <Items 
                        hearts = {userProgress.hearts}
                        points = {userProgress.points}
                        //For the shop subscription. Orginal is {false}
                        hasActiveSubscriptions = {isPro} 
                    />
                </div>
            </FeedWrapper>       
        </div>
    );
};

export default ShopPage;