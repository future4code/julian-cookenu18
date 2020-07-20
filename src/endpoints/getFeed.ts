import { Request , Response} from 'express'
import { Authenticator } from '../services/Authenticator'
import { BaseDatabase } from '../data/BaseDatabase'
import { FeedDatabase } from '../data/feedDatabase'


export const getFeed = async (req:Request , res:Response) => {

try{

    const token = req.headers.authorization as string
    const authenticator = new Authenticator()
    const authenticationData = authenticator.verify(token)
    const userid = authenticationData.id


    const feedDatabase = new FeedDatabase()
    const feed = await feedDatabase.getFeed(userid)


    res.status(200).send(feed)
}
catch ( error) {

res.status(400).send ({
    message: error.message
})

}

await BaseDatabase.destroyConnection()

}