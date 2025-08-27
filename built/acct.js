"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
exports.toString = toString;
function parse(acct) {
    let normedAcct;
    if (acct.startsWith('@'))
        normedAcct = acct.substring(1);
    else
        normedAcct = acct;
    const split = normedAcct.split('@', 2);
    return { username: split[0], host: split[1] || null };
}
function toString(acct) {
    return acct.host == null ? acct.username : `${acct.username}@${acct.host}`;
}
//# sourceMappingURL=acct.js.map