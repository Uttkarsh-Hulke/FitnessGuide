const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  readingTime: { type: String, default: '4 min read' },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  keyTakeaways: [{ type: String }],
  publishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
