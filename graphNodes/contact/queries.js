var graphQl = require("graphql")
var assert = require("assert")

var db;
require("../../dbSchema")(function (err, models) {
    db = models
})

module.exports = {
    contact: {
        args: {
            id: {
                type: graphQl.GraphQLID
            }
        },
        type: require("./type"),
        resolve: function (root, args,Qvariables) {
            return new Promise((resolve, reject) => {
                console.log(Qvariables)
                db.collections.contact.findOne(Qvariables).exec(function (err, contacts) {
                    assert.ifError(err)
                    console.log(contacts)
                    resolve(contacts)
                })
            })
        }
    },
    contacts: {
        args: {
            first: {
                type: graphQl.GraphQLID
            }
        },
        type: new graphQl.GraphQLList(require("./type")),
        resolve: function (root, args) {
            return new Promise((resolve, reject) => {
                db.collections.contact.find().exec(function (err, contacts) {
                    resolve(contacts)
                })
            })
        }
    }
}
