import Koa from 'koa'
import KoaStatic from 'koa-static'
import KoaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'

import { database } from './mongodb'
import GraphqlRouter from './router'
import config from './config'

database() // 链接数据库并且初始化数据模型

const app = new Koa()
const router = new KoaRouter();

app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

router.use('', GraphqlRouter.routes())

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.port);

console.log('graphQL server listen port: ' + config.port)
