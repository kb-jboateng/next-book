'use client';

import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <div className="flex items-center justify-center" style={{height: "calc(100vh - 248px)"}}>
            <div>
                <div className="text-center select-none">
                    <h2 className="text-3xl text-green"><span className="italic">next</span><span className="font-medium">Book</span></h2>
                    <p className="text-gray-lighter">Lost for your next read?</p>
                </div>
                <div className="pt-6">
                    <button className="bg-orange hover:bg-orange-dark w-full" onClick={() => signIn('goggle', {callbackUrl: '/home'})}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}