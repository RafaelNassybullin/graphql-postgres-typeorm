import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { DataModel } from "../schema";

@Resolver()
export class DataResolver {
  @Query(() => [DataModel])
  datas(): Promise<DataModel[]> {
    return DataModel.find({});
  }

  @Query(() => DataModel, { nullable: true })
  data(
    @Arg("id", () => Int)
    id: number
  ): Promise<DataModel | undefined> {
    return DataModel.findOne({ id });
  }

  @Mutation(() => DataModel)
  createData(

    @Arg("title", () => String)
    title: string,

    @Arg("description", () => String)
    description: string,

    @Arg("posterLink", () => String)
    posterLink: string,

    @Arg("videoUrl", () => String)
    videoUrl: string

  ): Promise<DataModel> {
    return DataModel.create({
      title,
      description,
      posterLink,
      videoUrl
    }).save();
  }

  @Mutation(() => Boolean)
  deleteData(
    @Arg("id", () => Int)
    id: number
  ): boolean {
    try {
      DataModel.delete({ id });
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  updateData(

    @Arg("id", () => Int)
    id: number,

    @Arg("title", () => String)
    title: string,

    @Arg("description", () => String)
    description: string,

    @Arg("posterLink", () => String)
    posterLink: string,

    @Arg("videoUrl", () => String)
    videoUrl: string

  ): boolean | null {

    const data = DataModel.findOne({ id });
    if (!data) {
      return null;
    }

    try {
      DataModel.update({ id }, { title, description, posterLink, videoUrl });
      return true;
    } catch {
      return false;
    }
  }
}
