var through = require('through2'),
    gutil = require('gulp-util'),
    explain = require('explainjs'),
    path = require('path'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-explainify';
const DEFAULT_EXT = '.json';

/**
 * @param {string} ext - output file extension
 */
function gulpExplainify(ext) {
    return through.obj(function(file, encoding, callback) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return callback();
        }

        var _this = this,
            fileContent = String(file.contents),
            fileExt = path.extname(file.path);

        if (file.isBuffer()) {
            explain(fileContent, function (error, result) {
                if (error) {
                    _this.emit('error', new PluginError(PLUGIN_NAME, error));
                    return callback();
                }

                result = JSON.stringify(result);
                file.contents = new Buffer(result);


                if (ext !== false) {
                    ext = ext || DEFAULT_EXT;
                    ext = ext.indexOf('.') === 0 || ext.length === 0 ? ext : '.' + ext;
                    file.path = file.path.replace(fileExt, ext)
                }

                _this.push(file);
                callback();
            });
        } else {
            _this.emit('error', new PluginError(PLUGIN_NAME, 'Buffer should be passed!'));
            return callback();
        }
    });
}

module.exports = gulpExplainify;
