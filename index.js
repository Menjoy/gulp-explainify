var through = require('through2'),
    gutil = require('gulp-util'),
    explain = require('explainjs'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-explainify';

function gulpExplainify() {
    return through.obj(function(file, encoding, callback) {
        var _this = this,
            fileContent = String(file.contents);

        if (file.isStream()) {
            _this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return callback();
        }

        if (file.isBuffer()) {
            explain(fileContent, function (error, result) {
                if (error) {
                    _this.emit('error', new PluginError(PLUGIN_NAME, error));
                    return callback();
                }

                result = JSON.stringify(result);
                file.contents = new Buffer(result);

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
