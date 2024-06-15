import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.clint
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // This method is how to create a new post
    async createPost({ title, content, featuredImage, userId, status, slug }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug
            ), {
                title,
                content,
                featuredImage,
                userId,
                status
            }
        } catch (error) {
            console.log("Error creating post :" + error);
        }
    }

    // how to updata the existing psot
    async updatePost(slug, { title, content, featuredImage, userId, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug
            ), {
                title,
                content,
                featuredImage,
                status
            }
        } catch (error) {
            console.log("Error updating post :" + error);
        }
    }

    // how to delete the post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug
            )
            return true;
        } catch (error) {
            console.log("delet post error" + error)
            return false;
        }
    }

    // how to get one post
    async getPost(slug) {
        try {
            return this.databases.getDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug
            )
        } catch (error) {
            console.log("getpost error" + error)
            return false;
        }
    }

    // how to get list of post
    async getlistPosts(queries = [Query.equal("status", "active")]) {
        try {
            return this.databases.listDocuments(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                queries,
            )
        } catch (error) {
            console.log("getlistpost error" + error);
            return false;
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("uploadFile error" + error);
            return false;
        }
    }

    // delete file
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("deleteFile error" + error);
            return false;
        }
    }

    // how to preview files
    getPreviewFile(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;