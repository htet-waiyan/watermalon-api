import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';
import { AuthMiddleware } from 'auth/auth.middleware';
import { RecipeController } from 'recipe/recipe.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, { useNewUrlParser: true }),
    AuthModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(RecipeController);
  }
}
