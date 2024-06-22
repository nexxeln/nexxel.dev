export const clx = (...classes: (string | false | undefined)[]): string =>
  classes.filter(Boolean).join(" ");
