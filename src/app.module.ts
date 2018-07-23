import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, { useNewUrlParser: true }),
    AuthModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
