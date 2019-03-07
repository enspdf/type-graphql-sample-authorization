import { ObjectType, Field, Authorized, Int, Float } from "type-graphql";

@ObjectType()
export class Recipe {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Authorized()
  @Field(type => [String])
  ingredients: string[];

  @Authorized("ADMIN")
  @Field(type => [Int])
  ratings: number[];

  @Field(type => Float, { nullable: true })
  get averageRating(): number | null {
    return this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
  }
}
