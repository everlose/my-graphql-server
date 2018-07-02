import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import infoSchema from './info';
import studentSchema from './student';

const schemas = [
    infoSchema,
    studentSchema
]

const SchemaDefinition = `
    schema {
        query: RootQuery,
        mutation: RootMutation,
    }
`;

// 特殊的query type定义
const RootQuery = `
    type RootQuery {
        ${schemas.map((schema) => { return schema.Query }).join('\n')}
    }
`

const RootMutation = `
    type RootMutation {
        ${schemas.map((schema) => { return schema.Mutation }).join('\n')}
    }
`

// 普通type定义
const types = `
    ${schemas.map((schema) => { return schema.types }).join('\n')}
`

let resolvers = {
    RootQuery: {},
    RootMutation: {}
};
schemas.forEach(function (schema) {
    let keys = Object.keys(schema.resolvers);
    keys.forEach(function (key) {
        if (key === 'Query') {
            Object.assign(resolvers.RootQuery, schema.resolvers.Query);
        } else if (key === 'Mutation') {
            Object.assign(resolvers.RootMutation, schema.resolvers.Mutation);
        } else {
            resolvers[key] =  schema.resolvers[key];
        }
    })
})

// console.log(JSON.stringify({
//     typeDefs: [
//         SchemaDefinition,
//         RootQuery,
//         RootMutation,
//         types
//     ],
//     resolvers,
// }));

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        RootQuery,
        RootMutation,
        types
    ],
    resolvers
});
