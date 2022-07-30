import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'vladimir777',
      password: 'slavaUkraine',
    },
    {
      userId: 2,
      username: 'hackerRank',
      password: 'whySoSerious',
    },
    {
        userId: 3,
        username: 'admin',
        password: 'admin123',
      },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}