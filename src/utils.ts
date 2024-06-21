export const clx = (...classes: (string | undefined)[]): string =>
  classes.filter(Boolean).join(" ");
