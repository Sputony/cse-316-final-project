const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true},
        username: { type: String, required: true },
        comments: { type: [ { commentUsername: { type: String, required: true}, commentString: { type: String, required: true } } ], required: true},
        likeUsernames: { type: [String], required: true},
        dislikeUsernames: { type: [String], required: true},
        views: { type: Number, required: true},
        publishDate: { type: Date, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
