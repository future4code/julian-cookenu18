import { BaseDataBase } from "./BaseDatabase";



export class RecipeDatabase extends BaseDataBase {
    private static TABLE_NAME = "Recipe";

    public async creatRecipe(
    id: string,
	title: string,
	ingredients: string,
    description: string,
	creation_date: string,
	creator_user_id: string
    ): Promise<void> {
    
        await this.getconnection() .insert({
            id,
            title,
            ingredients,
            description,
            creation_date,
            creator_user_id
        })
        .into(RecipeDatabase.TABLE_NAME);
        BaseDataBase.destroyConnection()
    }
    public async getUserByEmail(id: string): Promise<any> {
        const result = await this.getconnection()
          .select("*")
          .from(RecipeDatabase.TABLE_NAME)
          .where({ id });
        BaseDataBase.destroyConnection()
        return result[0];
      }

}