var Bookshelf  = require('bookshelf');
Bookshelf.PG = Bookshelf.initialize({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'lily',
    password : 'lily',
    database : 'lily',
    charset  : 'utf8'
  },
  debug: true
});
