import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserData, UserDataDocument } from '../../schema/userData.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserData.name) private userModel: Model<UserDataDocument>, private jwtService: JwtService) { }

  private createToken(user: UserData): string {
    const payload = { email: user.email, name: user.name };
    return this.jwtService.sign(payload);
  }

  getUsers(): Promise<UserData | any> {
    let userData: Promise<UserData | any>;

    //if (data.email) return this.userModel.findOne({ email: data.email }).exec();

    userData = this.userModel.find().exec();
    return userData;
  }

  async createUser(data: UserData): Promise<UserData[] | any> {
    const usersData = await this.userModel.findOne({ email: data.email }).exec();

    if (usersData) throw new Error('Email already registered');

    const userData = {
      email: data.email,
      name: data.name,
      password: await bcrypt.hash(data.password, 10),
    }

    const createdData = new this.userModel(userData);

    await createdData.save();

    const user = await this.userModel.findOne({ email: data.email }).exec();
    if (!user) throw new UnauthorizedException('User not found.')

    return {
      user: { id: user._id, email: user.email, name: user.name },
      token: this.createToken(user)
    };
  }
}
