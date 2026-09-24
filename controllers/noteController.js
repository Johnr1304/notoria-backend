import Note from "../models/Note.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const {
      title,
      content,
      tag,
      color,
      pinned,
      archived,
      trashed,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const note = await Note.create({
      title,
      content,
      tag,
      color,
      pinned: pinned || false,
      archived: archived || false,
      trashed: trashed || false,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.error("Create Note Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET ALL NOTES
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      notes,
    });
  } catch (error) {
    console.error("Get Notes Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// UPDATE NOTE
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    const {
      title,
      content,
      tag,
      color,
      pinned,
      archived,
      trashed,
    } = req.body;

    note.title = title ?? note.title;
    note.content = content ?? note.content;
    note.tag = tag ?? note.tag;
    note.color = color ?? note.color;
    note.pinned = pinned ?? note.pinned;
    note.archived = archived ?? note.archived;
    note.trashed = trashed ?? note.trashed;

    await note.save();

    res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    console.error("Update Note Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// DELETE NOTE PERMANENTLY
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await Note.findByIdAndDelete(id);

    res.status(200).json({
      message: "Note permanently deleted",
    });
  } catch (error) {
    console.error("Delete Note Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
