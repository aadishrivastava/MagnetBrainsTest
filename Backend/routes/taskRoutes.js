const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Task = require("../models/Task");

router.post("/", protect, async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority: priority || "medium",
      assignedTo: assignedTo || req.user._id,
      createdBy: req.user._id
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = { assignedTo: req.user._id };

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Task.countDocuments(filter)
    ]);

    res.json({
      tasks,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.assignedTo._id.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.assignedTo.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    const { title, description, dueDate, priority, status } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (priority !== undefined) task.priority = priority;
    if (status !== undefined) task.status = status;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.assignedTo.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.patch("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.assignedTo.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.patch("/:id/priority", protect, async (req, res) => {
  try {
    const { priority } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.assignedTo.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    task.priority = priority;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
