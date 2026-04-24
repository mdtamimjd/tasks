import { dbconnect } from "@/config/bd";
import Post from "@/model/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        await dbconnect()
        const post = await Post.find();
        return NextResponse.json({ok:true,post})
    } catch (error:any) {
        return NextResponse.json({ok:false,error:error.message},{status:500})
    }
}
export async function POST(req:NextRequest) {
    try {
        const body = await req.json();
        const {title} = body;
        console.log(`Show ${title} : trim ${title.trim()}`)
        if(!title || !title.trim()){
            return NextResponse.json({ok:false,error:"You must need title"},{status:404})
        }
        await dbconnect()
        const post = await Post.create({title});
        if(!post){
            return NextResponse.json({ok:false,error:"Task not create"},{status:404})
        }
        return NextResponse.json({ok:true,error:"Task create done",post})
    } catch (error:any) {
        return NextResponse.json({ok:false,error:error.message},{status:500})
    }
}