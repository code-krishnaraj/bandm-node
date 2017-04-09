var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId 	 = Schema.ObjectId;

var ProjectSchema   = new Schema({
	name: {type: String},
	user_id: {type: String},
	shared_users: [Schema.Types.Mixed],
	updated_at: { type: Date, default: Date.now },
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema, 'project');