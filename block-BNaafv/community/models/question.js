var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },

    slug: String,
    tags: [String],

    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
questionSchema.pre('save', function (next) {
  let random = Math.floor(Math.random() * 1000);
  let str = this.title.split(' ').join('-').concat(random);
  if (this.title && this.isModified('title')) {
    this.slug = str;
  }
  next();
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
