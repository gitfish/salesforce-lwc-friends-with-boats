import { not } from "./Predicates";

const charSet = {
    cr: "\r",
    lf: "\n",
    tab: "\t",
    space: " ",
    zero: "0",
    nine: "9",
    a: "a",
    z: "z",
    A: "A",
    Z: "Z"
};


const charCodes = {
    cr: charSet.cr.charCodeAt(0),
    lf: charSet.lf.charCodeAt(0),
    tab: charSet.tab.charCodeAt(0),
    space: charSet.space.charCodeAt(0),
    zero: charSet.zero.charCodeAt(0),
    nine: charSet.nine.charCodeAt(0),
    a: charSet.a.charCodeAt(0),
    z: charSet.z.charCodeAt(0),
    A: charSet.A.charCodeAt(0),
    Z: charSet.Z.charCodeAt(0)
};

const isWhitespace = (ch) => {
    var code = ch.charCodeAt(0);
    return isNaN(code) ||
            (code >= 9 && code <= 13) ||
            code === 32 ||
            code === 133 ||
            code === 160 ||
            code === 5760 ||
            (code >= 8192 && code <= 8202) ||
            code === 8232 ||
            code === 8233 ||
            code === 8239 ||
            code === 8287 ||
            code === 12288;
};

const isNotWhitespace = (ch) => {
    return !isWhitespace(ch);
};

const isDigit = (ch) => {
    var code = ch.charCodeAt(0);
    return code >= charCodes.zero && code <= charCodes.nine;
};

const isNotDigit = (ch) => {
    return !isDigit(ch);
};

const isAlpha = (ch) => {
    var code = ch.charCodeAt(0);
    return (code >= charCodes.a && code <= charCodes.z) || (code >= charCodes.A && code <= charCodes.Z);
};

const isNotAlpha = (ch) => {
    return !isAlpha(ch);
};

const isAlphaNumeric = (ch) => {
    return isAlpha(ch) || isDigit(ch);
};

const isNotAlphaNumeric = (ch) => {
    return !isAlpha(ch) && !isDigit(ch);
};

const isOneOf = (chars) => {
    return (ch) => {
        return chars && chars.indexOf(ch) >= 0;
    };
};

const isNotOneOf = (chars) => {
    return not(isOneOf(chars));
};

export {
    isWhitespace,
    isWhitespace as whitespace,
    isNotWhitespace,
    isNotWhitespace as nonWhitespace,
    isDigit,
    isDigit as digit,
    isNotDigit,
    isNotDigit as nonDigit,
    isAlpha,
    isAlpha as alpha,
    isNotAlpha,
    isNotAlpha as nonAlpha,
    isAlphaNumeric,
    isAlphaNumeric as alphaNumeric,
    isNotAlphaNumeric,
    isNotAlphaNumeric as nonAlphaNumeric,
    isOneOf,
    isNotOneOf
};