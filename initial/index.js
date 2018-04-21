const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const PORT = process.env.PORT || 7707;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'video',
  fields: {
    id: {
      type: GraphQLID,
      description: 'id'
    },
    title: {
      type: GraphQLString,
      description: 'title'
    },
    duration: {
      type: GraphQLInt,
      description: 'duration in seconds'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'whether or not the user watched video'
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'the root query type',
  fields: {
    video: {
      type: videoType,
      resolve: () =>
        new Promise(resolve => {
          resolve({
            id: '1',
            title: 'GraphQL',
            duration: 180,
            watched: true
          });
        })
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

const videoA = {
  id: '1',
  title: 'bar',
  duration: 180,
  watched: true
};

const videoB = {
  id: '1',
  title: 'bar',
  duration: 180,
  watched: true
};

const videos = [videoA, videoB];

const resolvers = {
  video: () => ({
    id: '1',
    title: 'bar',
    duration: 180,
    watched: true
  }),
  videos: () => videos
};

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolvers
  })
);

server.listen(PORT, () => {
  console.log(PORT);
});
