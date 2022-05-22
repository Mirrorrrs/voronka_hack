import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService) {}

  async sendReview(user_id, dto) {
    await this.prismaService.review.create({
      data: {
        user_id: user_id,
        marks: dto.marks,
        comment: dto.comment,
      },
    });
    return {
      success: true,
    };
  }
}
