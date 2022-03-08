const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const Reaction = require("./Reaction");

const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true,"Please provide a thought"],
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // the user that create this thought
    username: {
      type: String,
      required: [true,"Please enter a username"],
    },

    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// get total count of reaction on retrieval
ThoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;