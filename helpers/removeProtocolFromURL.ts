// remove the protocol from a URL
export const removeProtocolFromURL = (url: string): string => {
  return url.replace(/(^\w+:|^)\/\//, "");
};
