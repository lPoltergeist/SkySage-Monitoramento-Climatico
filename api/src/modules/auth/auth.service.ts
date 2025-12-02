import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserData, UserDataDocument } from '../../schema/userData.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(UserData.name) private userModel: Model<UserDataDocument>, private jwtService: JwtService) { }

    private createToken(user: UserData): string {
        const payload = { email: user.email, name: user.name };
        return this.jwtService.sign(payload);
    }

    async validadePassword(email: string, password: string): Promise<boolean> {
        console.log('Validating password for email:', email, password);
        const userExists = await this.userModel.findOne({ email: email }).exec();
        if (!userExists) return false

        const passwordMatches = await bcrypt.compare(password, userExists.password);
        if (!passwordMatches) return false;

        return true;
    }

    async login(data: UserData): Promise<UserData | any> {
        const passwordValid = await this.validadePassword(data.email, data.password);
        if (!passwordValid) throw new UnauthorizedException('Invalid credentials.')


        const user = await this.userModel.findOne({ email: data.email }).exec();
        if (!user) throw new UnauthorizedException('User not found.')

        return {
            user: { id: user._id, email: user.email, name: user.name },
            token: this.createToken(user)
        };
    }

    async isAuthenticated(token: string) {
        if (!token) throw new UnauthorizedException;

        try {
            const payload = this.jwtService.verify(token);
            return payload
        } catch {
            throw new UnauthorizedException;
        }

    }
}
