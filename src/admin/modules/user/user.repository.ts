import { readFile, writeFile } from 'fs/promises';
import { UserInterface } from './user.interface';

export class UserRepository {
  async findByUsername(username: string): Promise<UserInterface | undefined> {
    const data = await readFile('./src/admin/data/users.json', 'utf8');
    const users = JSON.parse(data);

    return users.find((user: UserInterface) => user.username === username);
  }

  async get(): Promise<UserInterface[]> {
    const data = await readFile('./src/admin/data/users.json', 'utf8');
    return JSON.parse(data);
  }

  async create(username: string): Promise<boolean> {
    const data = await readFile('./src/admin/data/users.json', 'utf8');
    const users = JSON.parse(data);
    users.push({ username: username });

    await writeFile('./src/admin/data/users.json', JSON.stringify(users));
    return true;
  }
}
