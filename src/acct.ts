export type Acct = {
	username: string;
	host: string | null;
};

export function parse(acct: string): Acct {
	let normedAcct;
	if (acct.startsWith('@')) normedAcct = acct.substring(1);
	else normedAcct = acct;
	const split = normedAcct.split('@', 2);
	return { username: split[0], host: split[1] || null };
}

export function toString(acct: Acct): string {
	return acct.host == null ? acct.username : `${acct.username}@${acct.host}`;
}
