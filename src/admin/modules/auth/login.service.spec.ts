import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { UserRepository } from '../user/user.repository';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService, UserRepository],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should create a user with long username and password "123456"', () => {
    const username = 'kivie';
    const password = '123456';

    const user = service.login(username, password);
    expect(user).toBeDefined();
    // expect(result.accessToken).toBeTruthy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an error for incorrect username or password', async () => {
      const username = 'kivie';
      const password = '1234567';

      const result = await service.login(username, password);
      expect(result).toHaveProperty('error');
      expect(result?.error).toBe('Invalid username or password');
    });

    it('should return a success message for correct username and password', async () => {
      const username = 'kivie';
      const password = '123456';

      const result = await service.login(username, password);
      expect(result).toHaveProperty('message');
      expect(result?.message).toBe('Login successful');
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('username', 'kivie');
      expect(result.data).toHaveProperty('password', '123456');
    });
  });
});
