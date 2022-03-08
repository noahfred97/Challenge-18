const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: [true, "Provide a username"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "An Email address is required"],
        match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
            "please enter valid email address",
      ],
    },
    thoughts: [
         {
            type: Schema.Types.ObjectId,
            ref: "Thoughts",
        },
    ],
    friends: [
        {
         type: Schema.Types.ObjectId,
         ref: "User", 
        },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;