import conf from "../conf/conf";
import { Client, ID ,Databases, Storage, Query } from "appwrite";

export class Service{

    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client.
        setEndpoint(conf.appwriteUrl)
       .setProject(conf.appwriteProjectId); 
       this.databases = new Databases(this.client);
       this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content, featuredImage,status, userId}){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                slug,
                {   title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        }
        catch(error){
            console.log("AppWrite createPost Method :: error ::",error)
        }
    }

    async updatePost(slug,{title,content, featuredImage,status}){
        try{
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                slug,
                {   title,
                    content,
                    featuredImage,
                    status,
                    
                }
            );
        }
        catch(error){
            console.log("AppWrite UpdatePost Method :: error ::",error)
        }
    }

    async deletePost(slug){
        try{
           await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
           return true;
        }
        catch(error){
            console.log("AppWrite deletePost Method :: error ::",error)
            return false;
        }
    }

    async GetPost(slug){
        try{
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
        }
        catch(error){
            console.log("AppWrite GetPost Method :: error ::",error)
        }
    }

    async GetPosts( queries = [Query.equal('status'),"Active"]){
        try{
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                queries,
            );
        }
        catch(error){
            console.log("AppWrite GetPosts Method :: error ::",error)
        }
    }

    //file upload service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,ID.unique(),
                file
            )
        }
        catch(error){
            console.log("AppWrite fileUpload Method :: error ::",error)
        }
    }

     //file delete service
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true

        }
        catch(error){
            console.log("AppWrite deleteFile Method :: error ::",error)
        }
    }

    //file preview Service
    async getFilePreview(fileId){
        try{
           return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        }
        catch(error){
            console.log("AppWrite getFilePreview Method :: error ::",error)
        }
    }

    //file download
    async getFileDownload(fileId){
        try{
           return await this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId
            )
        }
        catch(error){
            console.log("AppWrite getFileDownload Method :: error ::",error)
        }
    }
}

const service = new Service()
export default service