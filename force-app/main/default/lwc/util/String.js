import * as filters from "./StringFilters";
import { not } from "./Predicates";

const empty = "";

const Defaults = {
    padChar: " "
};

const isSane = (text) => {
    return text !== undefined && text !== null;
};

const startsWith = (text, match) => {
    return isSane(text) && isSane(match) && match.length <= text.length ? text.indexOf(match) === 0 : false;
};

const endsWith = (text, match) => {
    if(isSane(text) && isSane(match) && match.length <= text.length) {
        const idx = text.lastIndexOf(match);
        return idx >= 0 && (idx + match.length === text.length);
    }
    return false;
};

const contains = (text, match) => {
    return isSane(text) && isSane(match) ? text.indexOf(match) >= 0 : false;
};

const each = (text, cb) => {
    if(text) {
        const tl = text.length;
        for(let i = 0; i < tl; i ++) {
            cb(text.charAt(i), i, text);
        }
    }
};

const eachRtl = (text, cb) => {
    if(text) {
        const tl = text.length;
        for(let i = tl - 1; i >= 0; i--) {
            cb(text.charAt(i), i, text);
        }
    }
};

const some = (text, pr) => {
    if(text) {
        const tl = text.length;
        for(let i = 0; i < tl; i ++) {
            if(pr(text.charAt(i), i, text)) {
                return true;
            }
        }
    }
    return false;
};

const someRtl = (text, pr) => {
    if(text) {
        const tl = text.length;
        for(let i = tl - 1; i >= 0; i--) {
            if(pr(text.charAt(i), i, text)) {
                return true;
            }
        }
    }
    return false;
};

const every = (text, pr) => {
    if(text) {
        let tl = text.length;
        for(let i = 0; i < tl; i ++) {
            if(!pr(text.charAt(i), i, text)) {
                return false;
            }
        }
    }
    return true;
};

const everyRtl = (text, pr) => {
    if(text) {
        let tl = text.length;
        for(let i = tl - 1; i >= 0; i--) {
            if(!pr(text.charAt(i), i, text)) {
                return false;
            }
        }
    }
    return true;
};

const filter = (text, pr) => {
    if(text) {
        let r = empty;
        const action = (ch, idx, source) => {
            if(pr(ch, idx, source)) {
                r += ch;
            }
        };
        each(text, action);
        return r;
    }
    return text;
};

const reject = (text, pr) => {
    if(text) {
        let r = empty;
        const action = (ch, idx, source) => {
            if(!pr(ch, idx, source)) {
                r += ch;
            }
        };
        each(text, action);
        return r;
    }
    return text;
};

const map = (text, m) => {
    if(text) {
        let r = empty;
        let mc;
        const action = (ch, idx, source) => {
            mc = m(ch, idx, source);
            if(mc) {
                r += mc;
            }
        };
        each(text, action);
        return r;
    }
    return text;
};

const split = (text, pr) => {
    let r  = [];
    if(text) {
        let b = empty;
        const action = (ch, idx, source) => {
            if(pr(ch, idx, source)) {
                if(b) {
                    r.push(b);
                    b = empty;
                }
            } else {
                b += ch;
            }
        };
        each(text, action);

        if(b) {
            r.push(b);
        }
    }
    return r;
};

const removeWhitespace = (text) => {
    return reject(text, filters.isWhitespace);
};

const findIndexOf = (text, pr) => {
    let foundIdx = -1;
    if(pr) {
        const spr = (ch, idx, source) => {
            if(pr(ch, idx, source)) {
                foundIdx = idx;
                return true;
            }
            return false;
        };
        some(text, spr);
    }
    return foundIdx;
};

const findLastIndexOf = (text, pr) => {
    let foundIdx = -1;
    if(pr) {
        const spr = (ch, idx, source) => {
            if(pr(ch, idx, source)) {
                foundIdx = idx;
                return true;
            }
            return false;
        };
        someRtl(text, spr);
    }
    return foundIdx;
};

const leftTrim = (text, pr = filters.isWhitespace) => {
    if(text) {
        const idx = findIndexOf(text, not(pr));
        return idx >= 0 ? text.substring(idx) : empty;
    }
    return text;
};

const rightTrim = (text, pr = filters.isWhitespace) => {
    if(text) {
        const idx = findLastIndexOf(text, not(pr));
        return idx >= 0 ? text.substring(0, idx + 1) : empty;
    }
    return text;
};

const trim = (text, pr = filters.isWhitespace) => {
    return rightTrim(leftTrim(text, pr), pr);
};

const isBlank = (text) => {
    return every(text, filters.isWhitespace);
};

const isNotBlank = (text) => {
    return !isBlank(text);
};

const startsWithIgnoreCase = (text, match) => {
    return isSane(text) && isSane(match) ? startsWith(text.toLowerCase(), match.toLowerCase()) : false;
};

const endsWithIgnoreCase = (text, match) => {
    return isSane(text) && isSane(match) ? endsWith(text.toLowerCase(), match.toLowerCase()) : false;
};

const containsIgnoreCase = (text, match) => {
    return isSane(text) && isSane(match) ? contains(text.toLowerCase(), match.toLowerCase()) : false;
};

const equalsIgnoreCase = (l, r) => {
    return (l === r) || (l !== undefined && r !== undefined ? l.toLowerCase() === r.toLowerCase() : false);
};

const padLeft = (s, length, padChar = Defaults.padChar) => {
    let r = s || "";
    while(r.length < length) {
        r = padChar + r;
    }
    return r;
};

const stripLeft = (s, stripChar) => {
    if(s) {
        const idx = findIndexOf(s, (ch) => {
            return ch !== stripChar;
        });
        if(idx > 0) {
            return s.substring(idx);
        }
    }
    return s;
};

const padRight = (s, length, padChar = Defaults.padChar) => {
    let r = s || "";
    while(r.length < length) {
        r = r + padChar;
    }
    return r;
};

const stripRight = (s, stripChar) => {
    if(s) {
        const idx = findLastIndexOf(s, (ch) => {
            return ch !== stripChar;
        });
        if(idx < s.length - 1) {
            return s.substring(0, idx + 1);
        }
    }
    return s;
};

const join = (items, textMap, separator) => {
    const elems = [];
    if(items && items.length > 0) {
        let it;
        items.forEach((item, idx) => {
            it = textMap(item, idx);
            if(isNotBlank(it)) {
                elems.push(it);
            }
        });
    }
    return elems.length > 0 ? elems.join(separator) : "";
};

const capitalizeFirstLetter = (value) => {
    return isSane(value) && value.length > 0 ? value.charAt(0).toUpperCase() + value.slice(1) : value;
};

const wordsToCamelCase = (text) => {
    if(text) {
        let items = split(text, filters.isWhitespace).filter(w => isNotBlank(w));
        if(items.length > 0) {
            items = items.map((item, idx) => {
                return idx > 0 ? capitalizeFirstLetter(item) : item.toLowerCase();
            });
            return items.join("");
        }
    }
    return text;
};

export {
    empty,
    each,
    each as forEach,
    eachRtl,
    eachRtl as forEachRtl,
    eachRtl as eachReverse,
    eachRtl as forEachReverse,
    some,
    someRtl,
    someRtl as someReverse,
    every,
    everyRtl,
    everyRtl as everyReverse,
    filter,
    reject,
    map,
    split,
    removeWhitespace,
    findIndexOf,
    findLastIndexOf,
    leftTrim,
    leftTrim as trimLeft,
    rightTrim,
    rightTrim as trimRight,
    trim,
    isBlank,
    isNotBlank,
    startsWith,
    startsWithIgnoreCase,
    endsWith,
    endsWithIgnoreCase,
    contains,
    containsIgnoreCase,
    equalsIgnoreCase,
    padLeft,
    padLeft as leftPad,
    stripLeft,
    stripLeft as leftStrip,
    padRight,
    padRight as rightPad,
    stripRight,
    stripRight as rightStrip,
    join,
    capitalizeFirstLetter,
    wordsToCamelCase,
    filters,
    Defaults
};