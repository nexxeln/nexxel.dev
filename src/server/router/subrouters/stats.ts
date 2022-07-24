import { createRouter } from "../context";

export const statsRouter = createRouter().query("getGithubFollowers", {
  async resolve() {
    const userResponse = await fetch("https://api.github.com/users/nexxeln");
    const user = await userResponse.json();
    return {
      followers: user.followers,
    };
  },
});
