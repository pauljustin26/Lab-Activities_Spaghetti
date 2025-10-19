// backend/src/comments/dto/create-comment.dto.ts
export class CreateCommentDto {
  readonly postId: string;
  readonly content: string;
}
