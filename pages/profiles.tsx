import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

const images = [
    '/images/default-blue.png',
    '/images/default-red.png',
    '/images/default-slate.png',
    '/images/default-green.png'
]

interface UserCardProps {
    name: string;
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

const Profiles = () => {
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();

    const selectProfile = useCallback(() => {
        router.push('/');
    }, [router]);
    return (
        <>
            <div className="flex items-center  h-[1000px] justify-center">
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-6xl text-white">Who is wathching?</h1>
                    <div className="flex items-center justify-center gap-8 mt-10 ">
                        <div onClick={() => { }}>
                            <div className="group flex-row w-44 mx-auto">
                                <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group:hover border-white overflow-hidden">
                                    <img src="/images/default-blue.png"></img>
                                </div>
                                <div className="
                                mt-4
                                text-gray-400
                                text-2xl
                                text-center
                                group-hover:text-white
            
                                ">{currentUser?.name}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Profiles