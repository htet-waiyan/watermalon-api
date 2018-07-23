import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';

describe('Recipe Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RecipeController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: RecipeController = module.get<RecipeController>(RecipeController);
    expect(controller).toBeDefined();
  });
});
