import React,{useState,useEffect} from 'react'
import { Container,PostCard } from '../components'
import appWriteService from "../appwrite/config"

export default function AllPosts() {

    const [posts,setPost]= useState([])

    useEffect(() =>{
        appWriteService.GetPosts([]).then((posts)=>{
            if(posts){
                setPost(posts.documents)
            }
        })
    },[])

   return(
    <div className='w-full pyy-8'>
        <Container>

        {posts.map((post)=>{

            <div key={post.$id} className='p-2 w-1/4'>
                <PostCard post={post}/>
            </div>
        })}
        </Container>
    </div>
   )
  }
