import mongoose from 'mongoose'

const Info = mongoose.model('Info')

const types = `
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

    input newInfo {
        height: String
        weight: String
        hobby: [String]
    }
`;



const Query = `
    info(_id: String!): Info
    infos: [Info]
`

const Mutation = `
    newInfo(info: newInfo): Info
`

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
    },
    Mutation: {
        newInfo (root, params, options) {
            let infoInstance = new Info(params.info);
            return infoInstance.save();
        }
    }
}

export default {
    types,
    Query,
    Mutation,
    resolvers
};
