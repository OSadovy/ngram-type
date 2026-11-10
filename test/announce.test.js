const test = require('node:test');
const assert = require('node:assert');
const { nextTokenIndex, currentTokenIndex, spelledToken } = require('../announce.js');

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

test('the current token is the one being typed', () => {
    assert.strictEqual(currentTokenIndex(phrase, ''), 0);
    assert.strictEqual(currentTokenIndex(phrase, 't'), 0);
    assert.strictEqual(currentTokenIndex(phrase, 'th'), 0);
    assert.strictEqual(currentTokenIndex(phrase, 'th h'), 1);
});

test('right after a space, the current token is the next one', () => {
    assert.strictEqual(currentTokenIndex(phrase, 'th '), 1);
});

test('off track, the current token holds the mistake', () => {
    assert.strictEqual(currentTokenIndex(phrase, 'th hx'), 1);
    assert.strictEqual(currentTokenIndex(phrase, 'th hxyz abc'), 1);
});

test('a token is spelled, then given in the phonetic alphabet', () => {
    assert.strictEqual(spelledToken('le'), 'l e, lima echo');
    assert.strictEqual(spelledToken('I'), 'I, india');
    assert.strictEqual(spelledToken('a1;'), 'a 1 ;, alpha 1 ;');
});
