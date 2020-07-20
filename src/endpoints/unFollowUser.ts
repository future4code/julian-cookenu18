import {Request , Response} from 'express'
import { Authenticator } from '../services/Authenticator'
import {UserDatabase} from '../data/UserDatabase'
import {BaseDatabase} from '../data/BaseDatabase'
import { UsersRelationDatabase } from '../data/UsersRelationDatabase'

export const unFollowUser = async (req: Request, res:Response) => {

    try {
    const token = req.headers.authorization as string
    const userToUnFollowId = req.body.userToUnFollowId

    const authenticator = new Authenticator()
    const authenticationData = authenticator.verify(token)
    const userId = authenticationData.id
        

    if(!userToUnFollowId) {
        throw new Error ('Insira um id válido')
    }

    const userDataBase = new UserDatabase()
    const user = await userDataBase.getUserById(userToUnFollowId)

    if(!user) {
        throw new Error('Usuário não existe!')
    }

    const usersRelationDatabase = new UsersRelationDatabase()
    await usersRelationDatabase.unFollowUser(
        userId,
        userToUnFollowId
    )

    res.status(200).send({
        message: 'Você deixou de seguir o usuário!'
    })
    }
    catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
    await BaseDatabase.destroyConnection()
}