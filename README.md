## 资源

* [graphql官方教程](http://graphql.cn/graphql-js/graphql-clients/)
* [graphql js版的使用](https://github.com/graphql/graphql-js)，需要引入GraphQLObjectType这样的函数。The JavaScript reference implementation for GraphQL, a query language for APIs created by Facebook.
* [graphql tools](https://github.com/apollographql/graphql-tools) generate and mock GraphQL.js schemas，更方便，另外附上 [graphql 英文文档](https://www.apollographql.com/docs/graphql-tools/generate-schema.html#makeExecutableSchema)

入门资源，逐个往下看：

* [graphql-demo](https://github.com/naihe138/GraphQL-demo)，本篇使用的 graphql-js，可以用 graphql-tools 改进写法
* [graphql基础概念整理](https://www.jianshu.com/p/4f9b427f038f)，Field、Argument、Variables、Allases、Fragments、Directives、Mutation、Schemas、标量类型、枚举类型、输入类型

## 使用

在本地 mogodb 里建立一个 graphql 数据库，运行 `npm run start` 启动,

进入localhost:8152 输入一下代码实验查询

```js
# query {
#   infos {
#     _id
#     height
#     weight
#   }
  
#   info (_id: "5b3771b5b610505dcd06b8a5") {
#     _id
#     hobby
#   }
  
#   student {
#     name
#     sex
#     age
#     info {
#       hobby
#     }
#   }
# }

# mutation {
#   newInfo (info: {
#     height: "123"
#     weight: "50",
#     hobby: ["吃饭", "睡觉", "打豆豆"]
#   }) {
#     height
#     weight,
#     hobby
#   }
# }

# mutation {
#   newStudent (student: {
#     name: "陈子云"
#     sex: "male",
#     age: 26,
#     info: "5b3771b5b610505dcd06b8a5"
#   }) {
#     name,
#     sex,
#     age,
#     info {
#         weight,
#         height,
#         hobby
#     }
#   }
# }

# mutation {
#   updateStudent (student: {
#     _id: "5b39a7eea849ff5681427c21",
#     name: "陈子云"
#     sex: "female",
#     age: 100,
#     info: "5b3771b5b610505dcd06b8a5"
#   }) {
#     name,
#     sex,
#     age,
#     info {
#         weight,
#         height,
#         hobby
#     }
#   }
# }

mutation {
  removeStudent (_id: "5b39a7eea849ff5681427c21") {
    name
    sex
    age
  }
}
```


### graphql-tools

student有外键info的情况可以有两种写法

```js
const typeDefs = `
type Info {
    _id: ID!
    height: String
    weight: String
    hobby: [String]
    meta: Meta
}

type Meta {
    createdAt: String
    updatedAt: String
}

type Student {
    _id: ID!
    name: String
    sex: String
    age: Int
    info: Info
}

type Query {
    info(_id: String!): Info
    infos: [Info]
    student: [Student]
}

schema {
    query: Query
}
`;

// 第一种可以把Student写在Query外层
const resolvers = {
    Query: {
        info (root, params, options) {
            return Info.findOne({
                _id: params._id
            }).exec()
        },
        infos () {
            return Info.find({}).exec();
        },
        student () {
            return Student.find({}).exec();
        }
    },
    Student: {
        info (student) {
            return Info.findOne({
                _id: student.info
            }).exec();
        }
    }
}

// 第二种直接查询的时候使用populate
const resolvers = {
    Query: {
        info (root, params, options) {
            return Info.findOne({
                _id: params._id
            }).exec()
        },
        infos () {
            return Info.find({}).exec();
        },
        student () {
            return Student.find({}).populate({
                path: 'info',
                select: 'hobby height weight'
            }).exec()
        }
    }
}
```
