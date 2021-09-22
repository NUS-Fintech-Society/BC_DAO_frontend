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
