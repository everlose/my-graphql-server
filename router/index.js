import koaRouter from 'koa-router'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

// 引入schema
import schema from '../graphql/schema'

const router = koaRouter()

router
    .post('/graphql', async (ctx, next) => {
        await graphqlKoa({schema: schema})(ctx, next)
    })
    .get('/graphql', async (ctx, next) => {
        await graphqlKoa({schema: schema})(ctx, next)
    })
    .get('/graphiql', async (ctx, next) => {
        await graphiqlKoa({endpointURL: '/graphql'})(ctx, next)
    })

export default router
