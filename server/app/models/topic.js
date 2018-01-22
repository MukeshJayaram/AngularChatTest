//* Quick mongoose schema
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TopicSchema   = new Schema({
	name: String,
	serverID: String
});

module.exports = mongoose.model('Topic', TopicSchema);