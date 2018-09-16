var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongooseSlugPlugin = require('mongoose-slug-plugin');

var BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String
    }
});

BlogSchema.plugin(mongooseSlugPlugin, {
    tmpl: "<%=title%>",
  });
module.exports = mongoose.model('blogs', BlogSchema);