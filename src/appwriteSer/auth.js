import conf from "../conf/conf";
import { Client, ID, Account } from "appwrite";

export class AuthService {
    clint = new Client();
    account;

    constructor() {
        this.clint
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.clint);
    }
    // SignUp or when a user create first time their account
    async createAccount({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), name, email, password);
            if (userAccount) {
                // call another method
                return this.login({ email, password });
            } else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    }

    // if user already created the account now he want to login
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    // I want to know the user account exitst or not
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("getCurrentUser:: error: " + error);
        }
        return null;
    }

    // how to delete user account or Logtout
    async logout() {
        try {
           await this.account.deleteSession('current')
        } catch (error) {
            console.log("logout:: error: " + error);
        }
    }
};

const authService = new AuthService();

export default authService;