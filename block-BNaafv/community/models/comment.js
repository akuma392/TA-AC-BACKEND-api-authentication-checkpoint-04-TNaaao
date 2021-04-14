var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

var commentSchema = new Schema(
  {
    body: { type: String },
    questionId: { type: ObjectId, required: true, ref: 'Question' },
    // articleSlug: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
