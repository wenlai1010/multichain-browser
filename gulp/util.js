/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/17
 */

import rename from 'gulp-rename';

export default {
    /**
     * 获取详细文件信息
     * @param requestPath
     * @returns {{directoryPath: string, filePath: string, fileType: string, fileName: string, projectPath: (string|*)}}
     */
    getFileInfo(requestPath) {
        let filePath = '.' + requestPath;
        let lastIndex = filePath.lastIndexOf('.');
        let directoryPath = filePath.substring(0, lastIndex);
        let fileType = filePath.substring(lastIndex + 1);

        let projectPath;
        projectPath = './' + filePath.substring(filePath.indexOf('/src') + 1);

        let fileNameIndex;
        if (filePath.lastIndexOf('/') !== -1) {
            fileNameIndex = filePath.lastIndexOf('/') + 1;
        } else {
            fileNameIndex = filePath.lastIndexOf('\\') + 1;
        }
        let fileName = filePath.substring(fileNameIndex, lastIndex);

        return {
            directoryPath: directoryPath,
            filePath: filePath,
            fileType: fileType,
            fileName: fileName,
            projectPath: projectPath
        };
    },

    /**
     * 去掉文件夹路径
     * @use
     *  .pipe(removeDirname())
     * @returns {*}
     */
    removeDirname() {
        return rename(function(path) {
            path.dirname = '';
        });
    },

    /**
     * 判断是否是window操作系统
     * @returns {boolean}
     */
    isWindows() {
        return process.platform.indexOf('win32') < 0;
    }

}