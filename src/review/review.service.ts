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

  async getPersentage() {
    const reviews = await this.prismaService.review.findMany({
      where: {
        date: {
          gte: new Date(new Date().toDateString()),
        },
      },
      select: {
        marks: true,
      },
    });
    const best_sum: number = reviews.length * 9;
    const total_sum = reviews.map((el) => {
      return el.marks.reduce((reducer, value) => {
        return reducer + value;
      });
    });
    return (
      (total_sum.reduce((reducer, value) => {
        return reducer + value;
      }) /
        best_sum) *
      100
    );
  }
}
