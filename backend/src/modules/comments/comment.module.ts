/* #region Imports */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "src/typeorm/entities/comment.entity";
import { CommentController } from "./controllers/comment.controller";
import { CommentService } from "./services/comment.service";
/* #endregion */

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentEntity,
        ]),
    ],
    exports: [
        CommentService,
    ],
    providers: [
        CommentService,
    ],
    controllers: [
        CommentController,
    ],
})
export class CommentModule { }