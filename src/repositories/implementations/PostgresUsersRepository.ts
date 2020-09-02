import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";

export class PostgresUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const userId = this.users.findIndex((user) => user.email === email);

    return this.users[userId];
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
