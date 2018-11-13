#!/usr/bin/env node

/*jshint -W100*/
'use strict';


//リアルタイム検索からあるクエリでのつぶやきを何件か取ってくるやつ
var word = 'ヤバい';
var client = require('../node_modules/cheerio-httpcli/index');
console.info('Twitterから最新の'+word+'ツイートを取得します');
client.fetch('https://search.yahoo.co.jp/realtime/search/')
    .then(function (result) {
        return result.$('form').eq(0).submit({
            p: word
        });
    })
    .then(function (result) {
        var $ = result.$;
        var results = [];
        $('.cnt' + '.cf').each(function () {
            results.push({
                name: $(this).find('.refname').text().trim(),
                tweet: $(this).find('h2').text().trim(),
                time: $(this).find('.time').text().trim()
            });
        });
        for (var i = 1; i < results.length; i++) {
            console.log('Account: ' + results[i].name);
            console.log('Tweet: ' + results[i].tweet);
            console.log(results[i].time);
            console.log('');
        }
    })
    .catch(function (err) {
        console.error('エラーが発生しました', err);
    })
    .finally(function () {
        console.info('以上、最新の' + word + 'ツイートでした。');
    });
