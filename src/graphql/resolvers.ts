import { Query } from "mongoose";

export const resolvers = {
  Query: {
    recommendedMovie: async (parent: any, args: any, context: any) => {
      return "hello world";
    },
  },
};
