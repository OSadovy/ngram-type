// Speaks the lesson one token ahead of the typist, and spells the current
// token on request, through an ARIA live region that a screen reader reads
// aloud.

// Index of the token the typist should hear next: the one after the token
// being typed, or the one about to be typed after a space. -1 when the typed
// text has left the expected phrase or nothing remains to announce.
function nextTokenIndex(expectedPhrase, typedPhrase) {
    if (!expectedPhrase || !expectedPhrase.startsWith(typedPhrase)) {
        return -1;
    }

    var spaces = typedPhrase.split(' ').length - 1;
    var index = (typedPhrase === '' || typedPhrase.endsWith(' ')) ? spaces : spaces + 1;
    return index < expectedPhrase.split(' ').length ? index : -1;
}

// Index of the token holding the first character not yet typed correctly:
// the token being typed, the next one right after a space, or the one with
// the mistake while off track.
function currentTokenIndex(expectedPhrase, typedPhrase) {
    var correct = 0;
    while (correct < typedPhrase.length && typedPhrase[correct] === expectedPhrase[correct]) {
        correct++;
    }
    return expectedPhrase.slice(0, correct).split(' ').length - 1;
}

var phoneticAlphabet = {
    a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta', e: 'echo', f: 'foxtrot',
    g: 'golf', h: 'hotel', i: 'india', j: 'juliet', k: 'kilo', l: 'lima',
    m: 'mike', n: 'november', o: 'oscar', p: 'papa', q: 'quebec', r: 'romeo',
    s: 'sierra', t: 'tango', u: 'uniform', v: 'victor', w: 'whiskey',
    x: 'x-ray', y: 'yankee', z: 'zulu',
};

// "le" becomes "l e, lima echo".
function spelledToken(token) {
    var letters = token.split('');
    var words = letters.map(function(letter) {
        return phoneticAlphabet[letter.toLowerCase()] || letter;
    });
    return letters.join(' ') + ', ' + words.join(' ');
}

// Once a node is removed from a live region, NVDA speaks all of its remaining
// text, so each announcement replaces the whole content. A new node is still
// spoken when the token equals the previous one.
function announce(text) {
    var node = document.createElement('div');
    node.textContent = text;
    document.getElementById('announcer').replaceChildren(node);
}

if (typeof module !== 'undefined') {
    module.exports = {
        nextTokenIndex: nextTokenIndex,
        currentTokenIndex: currentTokenIndex,
        spelledToken: spelledToken,
    };
}
