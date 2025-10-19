export class CreateBookDto {
  readonly title: string;
  readonly author: string;
  readonly category: string;
  readonly publishedDate?: Date;
}
