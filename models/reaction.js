const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
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
    get: function () {
      // Custom formatting logic for timestamp
      return customFormat(this.createdAt);
    },
  },
});

// Custom function for formatting the timestamp
function customFormat(date) {
  // Implement your custom formatting logic here
  return date.toISOString();
}

module.exports = mongoose.model('Reaction', reactionSchema);
