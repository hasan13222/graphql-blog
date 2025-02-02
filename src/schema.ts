export const typeDefs = `#graphql
  
    type User {
    id: ID!       
    name: String!
    email: String!
    createdAt: String!
    posts:[Post]
    profile: Profile
    }

    type Profile {
    id: ID!
    bio: String!
    }

    type Post {
    id: ID!
    author: User!
    title: String
    content: String!
    published: Boolean!
    }

    type Mutation {
    signup(name: String, email: String, password: String): User
    }

  type Query {
    posts: [Post]
    users: [User]
    profiles: [Profile]
  }
`;
