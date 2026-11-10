// Speaks the lesson one token ahead of the typist, through an ARIA live region
// that a screen reader reads aloud.

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

// Once a node is removed from a live region, NVDA speaks all of its remaining
// text, so each announcement replaces the whole content. A new node is still
// spoken when the token equals the previous one.
function announce(text) {
    var node = document.createElement('div');
    node.textContent = text;
    document.getElementById('announcer').replaceChildren(node);
}

if (typeof module !== 'undefined') {
    module.exports = { nextTokenIndex: nextTokenIndex };
}
