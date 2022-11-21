const mongoose = require('mongoose');
//NOTE: had to change 'localhost' to '127.0.0.01' for connection to work.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/deep-thoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
