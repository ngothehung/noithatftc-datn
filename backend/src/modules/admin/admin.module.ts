import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductImageModule } from './product-image/product-image.module';
import { CategoryModule } from './category/category.module';
import { SlideModule } from './slide/slide.module';
import { VoteModule } from './vote/vote.module';
import { ArticleModule } from './article/article.module';
import { MenuModule } from './menu/menu.module';
import { ProductModule } from './product/product.module';
import { MiddlewareMiddleware } from './middleware/middleware.middleware';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        UserModule, 
        SlideModule, 
        ProductImageModule, 
        CategoryModule,  
        VoteModule, 
        ArticleModule, 
        MenuModule,
        ProductModule,
		JwtModule,
		OrderModule
    ],
    providers: [],
    controllers: []
})
export class AdminModule implements NestModule{
	configure(consumer: MiddlewareConsumer) {
        consumer.apply(MiddlewareMiddleware)
            .forRoutes('admin');
    }
 }
