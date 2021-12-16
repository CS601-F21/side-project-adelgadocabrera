const GITHUB_GIST_URL = "https://gist.github.com";

export type GITHUB_GIST = `${typeof GITHUB_GIST_URL}/${string}/${string}`;

export const isGithubGist = (url: string): boolean => {
  if (url.indexOf(GITHUB_GIST_URL) < 0) return false;
  const urlParts = url.split(GITHUB_GIST_URL);
  if (urlParts.length != 2) return false;

  const details = urlParts[1].split("/");
  if (details.length > 4 || details.length < 3) return false;
  if (details[2] == "") return false;
  if (details[0] != "") return false;
  if (details.length == 4) {
    if (details[3] != "") return false;
  }

  return true;
};
