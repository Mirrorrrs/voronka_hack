import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';
import { SendReviewDto } from './dto';

@UseGuards(AuthGuard('jwt-secure'))
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('send')
  sendReview(@Req() req, @Body() dto: SendReviewDto) {
    return this.reviewService.sendReview(req.user.user_id, dto);
  }

  @Get('/get_persentage')
  getPercentage() {
    return this.reviewService.getPersentage();
  }
}
