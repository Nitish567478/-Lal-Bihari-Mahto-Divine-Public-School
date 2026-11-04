const ContentBlock = require('../models/ContentBlock');
const mongoose = require('mongoose');
const fileStore = require('../utils/fileStore');

function mongoReady() {
  return mongoose.connection.readyState === 1;
}

async function getContent(req, res) {
  try {
    const key = req.params.key;
    if (!mongoReady()) {
      return res.json({ ok: true, key, json: fileStore.getContent(key), mode: 'local-file' });
    }

    const doc = await ContentBlock.findOne({ key });

    // If missing, return empty object so UI can render defaults
    res.json({ ok: true, key, json: doc ? doc.json : {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to fetch content' });
  }
}

async function upsertContent(req, res) {
  try {
    const key = req.params.key;
    const json = req.body?.json;

    if (json === undefined) {
      return res.status(400).json({ ok: false, error: 'Missing body.json' });
    }

    if (!mongoReady()) {
      fileStore.setContent(key, json);
      return res.json({ ok: true, key, json, mode: 'local-file' });
    }

    const doc = await ContentBlock.findOneAndUpdate(
      { key },
      { $set: { json } },
      { upsert: true, new: true }
    );

    res.json({ ok: true, key, json: doc.json });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to update content' });
  }
}

module.exports = { getContent, upsertContent };

