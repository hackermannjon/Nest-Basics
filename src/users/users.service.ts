import { Injectable } from '@nestjs/common';
import { Role } from './roles.enum';

@Injectable()
export class UsersService {
  private users: Array<{
    id: number;
    name: string;
    email: string;
    role: Role;
  }> = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: Role.ADMIN },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: Role.ENG },
    { id: 3, name: 'Carol', email: 'carol@example.com', role: Role.ENG },
    { id: 4, name: 'Dave', email: 'dave@example.com', role: Role.INTERN },
    { id: 5, name: 'Eve', email: 'eve@example.com', role: Role.ENG },
  ];

  findAll(role?: Role) {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  create(user: { name: string; email: string; role: Role }) {
    const usersByHighestId = this.users.reduce((a, b) => (a.id > b.id ? a : b));
    const newUser = {
      id: usersByHighestId.id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: { name?: string; email?: string; role?: Role }) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    const deletedUser = this.users.splice(index, 1);
    return deletedUser[0];
  }
}
