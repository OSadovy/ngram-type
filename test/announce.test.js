const test = require('node:test');
const assert = require('node:assert');
const { nextTokenIndex } = require('../announce.js');

const phrase = 'th he th he';

test('the first token before typing starts', () => {
    assert.strictEqual(nextTokenIndex(phrase, ''), 0);
});

test('the following token from the first letter of a token', () => {
    assert.strictEqual(nextTokenIndex(phrase, 't'), 1);
    assert.strictEqual(nextTokenIndex(phrase, 'th'), 1);
    assert.strictEqual(nextTokenIndex(phrase, 'th '), 1);
    assert.strictEqual(nextTokenIndex(phrase, 'th h'), 2);
});

test('nothing while off track', () => {
    assert.strictEqual(nextTokenIndex(phrase, 'tx'), -1);
    assert.strictEqual(nextTokenIndex(phrase, 'th  '), -1);
});

test('nothing once the last token is under way', () => {
    assert.strictEqual(nextTokenIndex(phrase, 'th he th h'), -1);
    assert.strictEqual(nextTokenIndex(phrase, phrase), -1);
});

test('nothing without a phrase', () => {
    assert.strictEqual(nextTokenIndex(undefined, ''), -1);
});
