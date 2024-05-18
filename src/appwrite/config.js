import { conf } from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class DatabaseService {
    client = new Client()
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client)

        this.storage = new Storage(this.client)
    }

    async createPost({ title, content, featuredImg, slug, Status, UseId, postedBy }) {
        try {
            console.log(Status, 103)
            let createPo = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    Status,
                    UseId,
                    postedBy
                }
            )
            console.log(createPo, 104)
            return createPo;
        } catch (error) {
            // console.log("Error at createPost :: ", error)
            throw error
        }

    }

    async updatePost(slug, { title, content, featuredImg, Status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    Status
                }
            )
        } catch (error) {
            console.log("Error at updatePost :: ", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("Error at deletePost :: ", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Error at getPost :: ", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal('Status', 'active')]) {
        try {
            console.log(queries, 21)
            let postss = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            console.log(postss, 22)
            return postss
        } catch (error) {
            console.log("Error at getPosts :: ", error)
            return false
        }
    }

    async myposts(userId, queries) {
        try {
            console.log(queries, 21)
            let postss = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries = [Query.equal('UseId', userId)]
            )
            console.log(postss, 22)
            return postss
        } catch (error) {
            console.log("Error at getPosts :: ", error)
            return false
        }
    }

    // File storage service

    async uploadFile(file) {
        try {
            console.log(file, 43)
            let fileData = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            console.log(fileData, 44)
            return fileData
        } catch (error) {
            console.log("Error at uploadFile :: ", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            console.log(fileId, 46);
            let deleteData = await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            // return true
            console.log(deleteData, 47);
            return deleteData
        } catch (error) {
            console.log("Error at deleteFile :: ", error)
            return false
        }
    }

    previewFile(fileId) {
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )

        } catch (error) {
            console.log("Error at getFilePreview :: ", error)
            return false
        }
    }
}

const databaseService = new DatabaseService();
export default databaseService