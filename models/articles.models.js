const knex = require('../connection');

exports.selectArticle = article_id => {
  return knex('articles')
    .where({ 'articles.article_id': article_id })
    .select('articles.*')
    .count({ comment_count: 'comments.comment_id' })
    .join('comments', { 'articles.article_id': 'comments.article_id' })
    .groupBy('articles.article_id')
    .then(([article]) => {
      if (!article)
        return Promise.reject({
          status: 404,
          msg: `Not Found - article_id: "${article_id}"`
        });
      else {
        article.comment_count = +article.comment_count;
        return { article };
      }
    });
};

exports.updateArticle = (article_id, inc_votes) => {
  return knex('articles')
    .where({ 'articles.article_id': article_id })
    .increment({ votes: inc_votes })
    .then(() => {
      return knex('articles')
        .where({ 'articles.article_id': article_id })
        .select('articles.*')
        .count({ comment_count: 'comments.comment_id' })
        .join('comments', { 'articles.article_id': 'comments.article_id' })
        .groupBy('articles.article_id');
    })
    .then(([article]) => {
      article.comment_count = +article.comment_count;
      return { article };
    });
};