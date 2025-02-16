import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserKitElementService } from './user-kitelement.service';
import { UserKitElement } from './entities/user-kitelement.entity';

@Controller('user-kitelements')
export class UserKitElementController {
  constructor(private readonly userkitelementService: UserKitElementService) {}

  @Post(':userId/:kitElementId')
    async addKitElement(
      @Param('userId') userId: string,
      @Param('kitElementId') kitElementId: string,
    ) {
      return this.userkitelementService.addKitElementToUser(userId, kitElementId);
    }
  
    @Get(':userId')
    async getKitElements(@Param('userId') userId: string): Promise<UserKitElement[]> {
      return this.userkitelementService.getUserKitElements(userId);
    }
}
