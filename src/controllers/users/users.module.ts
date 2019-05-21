import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import { AuthMiddleware } from '../../shared/middlewares/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user/list', method: RequestMethod.GET },
        { path: 'user/:userId', method: RequestMethod.GET },
        { path: 'user/update/:userId', method: RequestMethod.PUT },
        { path: 'user/delete/:userID', method: RequestMethod.DELETE },
      );
  }
}
