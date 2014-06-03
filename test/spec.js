browser.ignoreSynchronization = true;

describe('/?jquery', function () {
    beforeEach(function () {
        browser.get('/?jquery');
    });

    it('Loads jQuery', function () {
        expect(browser.executeScript('return "jQuery" in window')).toBeFalsy();

        browser.wait(function () {
            return element(by.xpath('//*[starts-with(.,"Loaded jquery")]')).isPresent();
        });

        expect(browser.executeScript('return "jQuery" in window')).toBeTruthy();
    });

    it('Links to jQuery homepage', function () {
        browser.wait(function () {
            return element(by.linkText('jquery')).isPresent();
        });

        expect(element(by.linkText('jquery')).getAttribute('href')).toEqual('http://jquery.com/');;
    });
});

describe('/?jquery@2.1.0,underscorejs', function () {
    beforeEach(function () {
        browser.get('/?jquery@2.1.0,underscorejs');
    });

    it('Loads jQuery version 2.1.0', function () {
        browser.wait(function () {
            return element(by.xpath('//*[starts-with(.,"Loaded jquery")]')).isPresent();
        });

        expect(browser.executeScript('return window.jQuery().jquery')).toEqual('2.1.0');
    });

    it('Also loads underscore.js', function () {
        browser.wait(function () {
            return element(by.xpath('//*[starts-with(.,"Loaded underscorejs")]')).isPresent();
        });

        expect(browser.executeScript('return "_" in window')).toBeTruthy();
    });
});
/*
var webdriver = require('selenium-webdriver');

var testPort = 8991;

var http = require('http'),
    ecstatic = require('ecstatic');

http.createServer(
    ecstatic({ root: __dirname + '/../app' })
).listen(testPort);

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

driver.get('http://localhost:' + testPort + '/?jquery');

driver.quit();
*/
