import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  type RecommendedMovie {
    id: ID!
    name: String!
    thumb: String!
    categories: [Category]!
  }

  type Query {
    recommendedMovies: [RecommendedMovie]!
    recommendedMovie(id: ID!): RecommendedMovie
  }
`;
