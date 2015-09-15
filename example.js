/**
 * Created by Ran on 15-Sep-15.
 */
var xroxy = require('./scraper');

var successCallback = function (proxies) {
    console.log(proxies);
};

var errorCallback = function (error) {
    console.log(error);
};


xroxy.getProxies(successCallback, errorCallback, 22);