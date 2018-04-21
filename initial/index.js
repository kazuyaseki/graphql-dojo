const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
type Query {
  id: ID,
  foo: String,
  duration: Int,
  watched: Boolean
}

type Schema {
  query: Query
}
`);

const resolvers = {
  id: () => '1',
  foo: () => 'bar',
  duration: () => 180,
  watched: () => true
};

const query = `
  query myFirstQuery {
    id foo duration watched
  }
`;

graphql(schema, query, resolvers)
  .then(result => console.log(result))
  .catch(error => console.log(error));
