import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserKitElement } from './entities/user-kitelement.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { KitElement } from 'src/kitelements/entities/kitelement.entity';

@Injectable()
export class UserKitElementService {
  constructor(
    @InjectRepository(UserKitElement)
    private readonly userKitElementRepository: Repository<UserKitElement>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(KitElement)
    private readonly kitElementRepository: Repository<KitElement>,
  ) {}

  async addKitElementToUser(userId: string, kitElementId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const kitElement = await this.kitElementRepository.findOne({
      where: { id: kitElementId },
    });

    if (!user || !kitElement) {
      throw new Error('Nie znaleziono użytkownika lub elementu stroju');
    }

    let userKitElement = await this.userKitElementRepository.findOne({
      where: { user: { id: userId }, kitElement: { id: kitElementId } },
    });

    if (userKitElement) {
        userKitElement.quantity += 1;
        await this.userKitElementRepository.save(userKitElement);
    } else {
        userKitElement = this.userKitElementRepository.create({
            user,
            kitElement,
            quantity: 1,
            firstFoundDate: new Date().toISOString(),
        });
        await this.userKitElementRepository.save(userKitElement);
    }
  }

  async getUserKitElements(userId: string): Promise<UserKitElement[]> {
    return this.userKitElementRepository.find({
        where: { user: { id: userId } },
        relations: ['kitElement'],
      });
  }
}
