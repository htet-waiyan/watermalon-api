import { Module, Post, Body } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from './recipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Recipe', schema: RecipeSchema}]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {
}
