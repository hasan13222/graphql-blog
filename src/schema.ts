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
  authorId: Int!
  author: User
  title: String!
  content: String!
  published: Boolean
  }

  type Mutation {
  signup(name: String, email: String, password: String): User,
  signin(email: String, password: String): AuthPayload,
  createPost(post: PostInput!): PostPayload,
  updatePost(postId: Int!, post: PostInput): UpdatePostPayload,
  deletePost(postId: Int! ): UpdatePostPayload,
  }

  input PostInput {
  title: String
  content: String
  published: Boolean
  }

  type AuthPayload {
    userError: String
    token: String
  }
  
  type PostPayload {
    createPostError: String
    post: Post
  }
  type UpdatePostPayload {
    updatePostError: String
    post: Post
  }
    
  type Query {
    posts: [Post]
    users: [User]
    profiles: [Profile]
  }
`;
