const Grievance = require("../models/Grievance");

// ➕ CREATE
exports.create = async (req, res) => {
  try {
    const grievance = new Grievance({
      ...req.body,
      user: req.user
    });

    const saved = await grievance.save();
    res.json(saved);

  } catch (err) {
    console.error("CREATE ERROR:", err.message);
    res.status(400).json({ msg: err.message });
  }
};

// 📥 GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Grievance.find({ user: req.user });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📄 GET BY ID
exports.getById = async (req, res) => {
  try {
    const data = await Grievance.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✏️ UPDATE (FIXED WARNING HERE)
exports.update = async (req, res) => {
  try {
    const data = await Grievance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" } // ✅ FIX
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ DELETE
exports.delete = async (req, res) => {
  try {
    await Grievance.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔍 SEARCH
exports.search = async (req, res) => {
  try {
    const data = await Grievance.find({
      title: { $regex: req.query.title, $options: "i" }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};