import { conf } from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                
                return this.login({ email, password });
            }
            else {
                return userAccount
            }

        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            let log = await this.account.createEmailPasswordSession(email, password);
            return log;
        } catch (error) {
            // console.log("Error at login :: ", error)
            throw (error)
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions() // changed deleteSession to deleteSessions
        } catch (error) {
            console.log("Error at logOut :: ", error)
        }
    }

    async getCurrentUser() {
        try {

            return await this.account.get()

        } catch (error) {
            console.log("Error at getCurrentUser :: ", error)
        }
        // return null
    }
}

const authService = new AuthService()
export default authService 
