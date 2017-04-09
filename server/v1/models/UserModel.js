var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId 	 = Schema.ObjectId;

var UserSchema   = new Schema({
	name: {type: String},
	google_id: {type: Number},
	email: {type: String},
	updated_at: { type: Date, default: Date.now },
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema, 'user');