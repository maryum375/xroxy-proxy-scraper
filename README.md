Xroxy-Proxy-Scraper
=================

Lightweight NodeJS library to scrape proxies from xroxy.com

installation
---
To install simply run the npm command:
```sh
$ npm install xroxy-proxy-scraper
```
Usage
---
import node module
```js
var xroxy = require('xroxy-proxy-scraper');
```
call the method ```getProxies```
```js
var maxNumberOfProxies = 22;
xroxy.getProxies(function(proxies){
    /* Code to be executed when scraping is done successfully */
}, function(error){
    /* Code to be executed when scraping failed */
}, maxNumberOfProxies);
```

```proxies``` format:
```
{ 
  '202.118.236.130' : '3128',
  '111.11.27.194'   : '80',
  '183.136.221.6'   : '3128',
  '183.207.228.58'  : '80',
  '190.106.66.178'  : '3128',
  '61.55.141.10'    : '81',
  '124.67.215.9'    : '80',
  ...etc
}
```

License
---
MIT

**Feel free to fork and contribute :)**