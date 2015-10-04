/**
 * Created by Ran on 15-Sep-15.
 */
var request = require('request');

/* Scrapes proxies from xroxy.com, pageNum & proxiesScraped are optional */
var getProxies = function (callback, maxProxiesCount, pageNum, proxiesScraped) {

    if (!proxiesScraped) {
        proxiesScraped = {};
    }

    /* If the client didn't specify the number of proxies to scrape set it to 100 */
    if (!maxProxiesCount) {
        maxProxiesCount = 100;
    }

    if (!pageNum) {
        pageNum = 0;
    }

    request('http://www.xroxy.com/proxylist.php?type=All_http&pnum=' + pageNum, function (err, res, body) {
        if (!res || res.statusCode != 200) {
            callback("Response code was not 200");
            return;
        }

        var ips = [];
        var ports = [];

        body.replace(/<td><a.*?>([0-9]+)<\/a>/g, function () {
            ports.push(arguments[1])
        });

        body.replace(/>([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/g, function () {
            ips.push(arguments[1])
        });
        var count = 0;

        if (ips.length > 0) {
            if (ports.length == 0 || ports.length != ips.length) {
                callback("Regex parsing has failed.");
                return;
            }

            var maxProxiesCountReached = false;

            for (var i = 0; i < ips.length; i++) {
                count++;
                proxiesScraped[ips[i]] = ports[i];

                if (Object.keys(proxiesScraped).length === maxProxiesCount) {
                    maxProxiesCountReached = true;
                    break;
                }
            }

            console.log('Collected ' + count + ' http proxies from page ' + pageNum);

            if (maxProxiesCountReached) {
                console.log('Reached max requested proxies count.');
                callback(null,proxiesScraped);
                return;
            }
            getProxies(callback, maxProxiesCount, pageNum + 1, proxiesScraped)
        }
        else {
            callback(null,proxiesScraped)
        }

    })
};

module.exports = {getProxies: getProxies};
