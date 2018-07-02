
import mongoose from 'mongoose'

const Student = mongoose.model('Student')
const Info = mongoose.model('Info')

const types = `
    type Student {
        _id: ID!
        name: String
        sex: String
        age: Int
        info: Info
    }

    input newStudent {
        name: String
        sex: String
        age: Int
        info: String
    }

    input updateStudent {
        _id: String!
        name: String
        sex: String
        age: Int
        info: String
    }
`;

const Query = `
    student: [Student]
`

const Mutation = `
    newStudent(student: newStudent): Student
    updateStudent(student: updateStudent): Student
    removeStudent(_id: String): Student
`

const resolvers = {
    Query: {
        student () {
            return Student.find({}).exec()
        }
    },
    Mutation: {
        newStudent (root, params, options) {
            let stuInstance = new Student(params.student);
            return stuInstance.save();
        },
        updateStudent:  async function (root, params, options) {
            let student = params.student;
            await Student.findByIdAndUpdate(student._id, student);
            return student;
        },
        // updateStudent: async function (root, params, options) {
        //     let student = params.student;
        //     const theStu = await Student.findById(student._id);
        //     if (!theStu) {
        //         throw '不存在此人'
        //     }
        //     Object.assign(theStu, student);
        //     await theStu.save();
        //     return theStu;
        // },
        removeStudent (root, params, options) {
            return Student.findByIdAndRemove(params._id).exec();
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

export default {
    types,
    Query,
    Mutation,
    resolvers
};
