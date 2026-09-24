import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      default: "",
    },

    tag: {
      type: String,
      default: "Personal",
      trim: true,
    },

    color: {
      type: String,
      default: "#EEF2FF",
    },

    pinned: {
      type: Boolean,
      default: false,
    },

    archived: {
      type: Boolean,
      default: false,
    },

    trashed: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;