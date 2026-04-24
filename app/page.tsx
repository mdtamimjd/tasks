"use client"
import React, { useEffect, useState } from 'react'

export default function page() {
  const [title, setTitle] = useState<string>("")
  const [tasks, setTasks] = useState<any[]>([])
  const [editId, setEditId] = useState<string | null>(null)

  const featchTasks = async () => {
    const req = await fetch("api/post");
    const data = await req.json()
    setTasks(data.post)
    setTitle("")
    setEditId(null)

  }
  useEffect(() => {
    featchTasks()
  }, [])

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) {
      return;
    }
    if (editId) {
      const req = await fetch(`api/post/${editId}`, { method: "PUT", body: JSON.stringify({ title }) })
      const data = await req.json()
      featchTasks()
    } else {
      const req = await fetch("api/post", { method: "POST", body: JSON.stringify({ title }) })
      const data = await req.json();
      // setEditId(null)
      // setTitle("")
      featchTasks()
    }
  }
  const editBtn = (data: any) => {
    setEditId(data._id)
    setTitle(data.title)
  }
  const deleteBtn = async (id:string)=>{
    const req = await fetch(`api/post/${id}`,{method:"DELETE"})
    const data = req.json()
    featchTasks()
  }
  const toggle = async(id:string)=>{
    const req = await fetch(`api/post/${id}`,{method:"POST"})
    const data = await req.json()
    featchTasks()
  }
  return (
    <div className='max-w-3xl mx-auto my-5 p-3'>
      {/* form */}
      <form onSubmit={handlerSubmit} className='gap-3 flex justify-center items-center'>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className='outline-2 p-2 rounded-md focus:outline-green-500 text-lg' placeholder='Enter task' />
        <button className={`text-lg bg-green-500 rounded-md py-2 px-5 hover:bg-green-600  ${editId && "bg-orange-500 text-white"}`}>{editId ? "Update" : "Add"}</button>
      </form>
      <div className='mt-5'>
        <h1 className='text-xl font-bold border-b-2'>Show tasks</h1>
        <div className='space-y-5 mt-5'>
          {
            tasks.map((d) => (
              <div key={d._id} className='border rounded-md p-2 shadow-lg flex justify-between gap-2'>
                <div>
                  <input type="checkbox" checked={d.status} onChange={()=>toggle(d._id)} />
                  <span className={`text-lg pl-1 ${d.status && "line-through text-gray-500"}`}>{d.title}</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <button className={`px-2 text-white rounded-md ${d.status ? "bg-gray-400 cursor-not-allowed":"bg-indigo-500"}`} disabled={d.status} onClick={() => editBtn(d)}>Edit</button>
                  <button className='bg-red-500 px-2 text-white rounded-md' onClick={()=>deleteBtn(d._id)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
