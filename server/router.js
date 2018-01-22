//* Ideally some of the code should have been kept in DAO but implementing a quick one here
var express = require('express');

/**
 * Database connection
 */
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/nodetest1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log("DB connection alive");
});

var Topic = require('./app/models/topic');

var router = express.Router();


router.route('/topics')

  /**
   * Create new topic with
   * @param name
   * @param serverID
   * @returns id
   */
  .post(function (req, res) {

    var topic = new Topic();
    topic.name = req.body.name;
    topic.serverID = req.body.serverID;
    topic.save(function (err, result) {
      if (err)
        res.send(err);
      res.json({
        message: 'topic created!',
        id: result._id
      });
    });
  })

  /**
   * Get complete list of topics
   */
  .get(function (req, res) {
    Topic.find(function (err, topics) {
      if (err)
        res.send(err);

      res.json(topics);
    });
  });

router.route('/topics/:topic_id')

  /**
   * Get details of topic
   * @param topic_id
   */
  .get(function (req, res) {
    Topic.findById(req.params.topic_id, function (err, topic) {
      if (err)
        res.send(err);
      res.json(topic);
    });
  })

  /**
   * Update details of topic
   * @param topic_id
   */
  .put(function (req, res) {
    Topic.findById(req.params.topic_id, function (err, topic) {

      if (err)
        res.send(err);

      topic.name = req.body.name;
      topic.save(function (err) {
        if (err)
          res.send(err);

        res.json({
          message: 'topic updated!'
        });
      });

    });
  })

  /**
   * Delete topic
   * @param topic_id
   */
  .delete(function (req, res) {
    Topic.remove({
      _id: req.params.topic_id
    }, function (err, topic) {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
    });
  });



module.exports = router;