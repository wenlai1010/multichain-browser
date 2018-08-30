/**
 * @file
 * @auth jinguangguo
 * @date 2017/1/16
 */

// IE兼容
(function () {
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    var trim_Version = version[1].replace(/[ ]/g, "");
    if (browser == "Microsoft Internet Explorer" && (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0"
            || trim_Version == "MSIE8.0" || trim_Version == "MSIE9.0")) {
        window.location.href = './ie.html';
    }
})();

// webp兼容
(function () {
    function addWebp() {
        var htmlClass = document.documentElement.className;
        if (htmlClass) {
            document.documentElement.className += ' webp';
        } else {
            document.documentElement.className = "webp";
        }
    }

    function detect() {
        var WebP = new Image();
        WebP.onload = WebP.onerror = function () {
            if (WebP.height != 2) {
                window.localStorage.setItem('webp', 0);
            } else {
                window.localStorage.setItem('webp', 1);
            }
        };
        WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    if (typeof window.localStorage !== 'undefined') {
        if (window.localStorage.getItem('webp') === '1') {
            addWebp();
        } else {
            detect();
        }
    }
})();

