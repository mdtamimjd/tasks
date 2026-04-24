import { dbconnect } from "@/config/bd";
import Post from "@/model/Post";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ ok: false, error: "Not found!" }, { status: 404 })
        }
        await dbconnect()
        const post = await Post.findOne({ _id: id });
        if (!post) {
            return NextResponse.json({ ok: false, error: "Not found tasks" }, { status: 404 })
        }
        return NextResponse.json({ ok: true, post })
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }
}

export async function PUT(req:NextRequest,{params}:{params:{id:string}}) {
    try {
        const { id } = await params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ ok: false, error: "Not found!" }, { status: 404 })
        }
        const body = await req.json();
        const {title} = body;
        console.log(`Show ${title} : trim ${title.trim()}`)
        if(!title || !title.trim()){
            return NextResponse.json({ok:false,error:"You must need title"},{status:404})
        }
        await dbconnect()
        const post = await Post.findByIdAndUpdate(id,{title},{new:true});
        if(!post){
            return NextResponse.json({ok:false,error:"Task not Update"},{status:404})
        }
        return NextResponse.json({ok:true,error:"Task Update done",post})
    } catch (error:any) {
        return NextResponse.json({ok:false,error:error.message},{status:500})
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ ok: false, error: "Not found!" }, { status: 404 })
        }
        await dbconnect()
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return NextResponse.json({ ok: false, error: "Not found tasks & not delete" }, { status: 404 })
        }
        return NextResponse.json({ ok: true,error:"Delete successful", post })
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }
}

// tasks status update
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ ok: false, error: "Not found!" }, { status: 404 })
        }
        await dbconnect()
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json({ ok: false, error: "Not found tasks" }, { status: 404 })
        }
        post.status = !post.status;
        await post.save();
        return NextResponse.json({ ok: true, post })
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }
}