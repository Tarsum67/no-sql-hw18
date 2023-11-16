const mongoose = require('mongoose');
const { Schema } = mongoose;

// Reaction Schema (nested document)
const reactionSchema = new Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

// Main Thought Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Array of nested documents using the reactionSchema
});

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Format the timestamp using a custom function
function dateFormat(timestamp) {
  return new Date(timestamp).toLocaleDateString();
}

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
