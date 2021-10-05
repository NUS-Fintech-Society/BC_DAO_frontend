export function getShortAccountHash(account) {
  const accountHash = String(account);
  if (accountHash) {
    return (
      accountHash.slice(0, 6) +
      "..." +
      accountHash.slice(-4, accountHash.length)
    );
  } else {
    return "Login";
  }
}

export function getAccountHash(accounts, networkId) {
  if (accounts && accounts.length && networkId === 3) {
    return accounts[0];
  } else {
    return false;
  }
}
