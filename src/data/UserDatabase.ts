import { BaseDataBase } from "./BaseDatabase";
import { USER_ROLES } from "../services/Authenticator";

export class UserDatabase extends BaseDataBase {


  private static TABLE_NAME = "CookUser";

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES
  ): Promise<void> {
    await this.getconnection()
      .insert({
        id,
        name,
        email,
        password,
        role
      })
      .into(UserDatabase.TABLE_NAME);

    BaseDataBase.destroyConnection()
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getconnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });
    BaseDataBase.destroyConnection()
    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getconnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
    BaseDataBase.destroyConnection()
    return result[0];
  }
  public async deleteUser(id: string): Promise<void> {
    await this.getconnection().raw(`
      DELETE FROM ${UserDatabase.TABLE_NAME}
      WHERE id = "${id}"
    `)
    BaseDataBase.destroyConnection()
  }
}