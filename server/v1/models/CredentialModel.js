var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId 	 = Schema.ObjectId;

var CredentialSchema   = new Schema({
	name: {type: String},
	project_id: {type: String},
	content: [Schema.Types.Mixed],
	updated_at: { type: Date, default: Date.now },
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Credential', CredentialSchema, 'credential');