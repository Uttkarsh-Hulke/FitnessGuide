const Article = require('../models/Article');
const { defaultArticles } = require('../services/seedService');

exports.getAllArticles = async (req, res) => {
  try {
    let articles = [];
    try {
      articles = await Article.find().sort({ publishedAt: -1 });
    } catch (dbErr) {
      console.warn('[ArticleController] DB error, using default fallback articles.');
      articles = defaultArticles;
    }

    if (!articles || articles.length === 0) {
      articles = defaultArticles;
    }

    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    console.error('[ArticleController] Error fetching articles:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let article = null;
    try {
      article = await Article.findOne({ slug });
    } catch (dbErr) {
      article = defaultArticles.find(a => a.slug === slug);
    }

    if (!article) {
      article = defaultArticles.find(a => a.slug === slug);
    }

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    return res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('[ArticleController] Error fetching article by slug:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
