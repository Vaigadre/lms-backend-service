const shell = require('shelljs');

shell.cp('-R', 'src/config/ssl-cert', 'dist/config/ssl-cert');
shell.cp('-R', 'src/tools/', 'dist/');
// shell.cp("-R", "src/public/images", "dist/public/");
