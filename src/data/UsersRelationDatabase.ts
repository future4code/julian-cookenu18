import { BaseDataBase } from "./BaseDatabase";

export class UsersRelationDatabase extends BaseDataBase {

    private static TABLE_NAME = 'users_relation'


    public async followUser (userId : string , userToFollowId : string):Promise<void> {
        await this.getconnection()
        .insert({
            user_id : userId,
            user_to_follow_id : userToFollowId
        })
        .into(UsersRelationDatabase.TABLE_NAME)

        
    }


    public async unFollowUser (userId : string , userToUnFollowId : string):Promise<void> {
        await this.getconnection()
        .delete()
        .into(UsersRelationDatabase.TABLE_NAME)
        .where({
            user_id : userId,
            user_to_follow_id : userToUnFollowId
        })

        
    }


}