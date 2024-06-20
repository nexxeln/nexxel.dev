export const clx = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");
