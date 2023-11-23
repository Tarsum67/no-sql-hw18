const { User, Thought } = require('../models');

const thoughtController = {
  getThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then(async (dbThoughtData) => {
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );

        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        User.findOneAndUpdate(
          { username: dbThoughtData.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        ).then(() => {
          res.json(dbThoughtData);
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;