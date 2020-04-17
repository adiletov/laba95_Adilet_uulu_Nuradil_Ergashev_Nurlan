const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath : path.join(rootPath, '/public/uploads/'),
    database: 'mongodb://localhost/coctails',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    facebook: {
        appId: '1342251599302385',
        appSecret: '382272bfacf29e5c59a796425d6e1d2e'
    }
};
