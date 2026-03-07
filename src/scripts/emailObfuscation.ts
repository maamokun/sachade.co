export function obfuscateEmail() {
  const emailElement = document.getElementById("obfuscated-email");
  if (emailElement && emailElement instanceof HTMLAnchorElement) {
    const user = "webmaster";
    const domain = "sachade.co";
    emailElement.innerHTML = user + "&#64;" + domain;
    emailElement.href = "mailto:" + user + "@" + domain;
  }
}
