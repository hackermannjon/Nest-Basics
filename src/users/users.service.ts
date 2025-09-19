import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'ADMIN' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'ENG' },
    { id: 3, name: 'Carol', email: 'carol@example.com', role: 'ENG' },
    { id: 4, name: 'Dave', email: 'dave@example.com', role: 'INTERN' },
    { id: 5, name: 'Eve', email: 'eve@example.com', role: 'ENG' },
  ];

  findAll(role?: 'ADMIN' | 'ENG' | 'INTERN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  create(user: {
    name: string;
    email: string;
    role: 'ADMIN' | 'ENG' | 'INTERN';
  }) {
    const usersByHighestId = this.users.reduce((a, b) => (a.id > b.id ? a : b));
    const newUser = {
      id: usersByHighestId.id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    user: { name?: string; email?: string; role?: 'ADMIN' | 'ENG' | 'INTERN' },
  ) {
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
