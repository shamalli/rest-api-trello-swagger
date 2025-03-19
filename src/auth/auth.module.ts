import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
//import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
	imports: [
		UsersModule,
		PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: true,
        }),
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '6000s' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, UsersService/*, LocalStrategy*/, JwtStrategy],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
