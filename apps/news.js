#!/usr/bin/env node

/*jshint -W100*/

'use strict';

//Yahoo JAPAN!からトップニュースのタイトルを取得してくるやつ

var client = require('../node_modules/cheerio-httpcli/index');
console.info('デバッグオプションを有効にします');
client.set('debug', true);
console.info('Hello Yahoo!');
client.fetch('https://www.yahoo.co.jp/')
    .then(function (result) {
        for (var i = 0; i < result.$('#topicsfb> .topicsindex> .emphasis> li').length; i++) {
            console.info(i+1+'. '+result.$('#topicsfb> .topicsindex> .emphasis> li').eq(i).text());
        }
    })
    .catch(function (err) {
        console.error('エラーが発生しました', err);
    })
    .finally(function () {
        console.info('Good Bye Yahoo!');
    });
