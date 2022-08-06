import { Test, TestingModule } from '@nestjs/testing';
import { SignIn } from './sign-in';

describe('SignIn', () => {
  let provider: SignIn;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignIn],
    }).compile();

    provider = module.get<SignIn>(SignIn);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
