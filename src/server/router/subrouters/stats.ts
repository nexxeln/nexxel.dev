import { createRouter } from "../context";

export const statsRouter = createRouter()
  .query("getGithubFollowers", {
    async resolve() {
      const userResponse = await fetch("https://api.github.com/users/nexxeln");
      const user = await userResponse.json();
      return {
        followers: user.followers,
      };
    },
  })
  .query("getGithubStars", {
    async resolve() {
      // credit: leerob.io
      const userReposResponse = await fetch(
        "https://api.github.com/users/nexxeln/repos?per_page=100"
      );

      const repos = await userReposResponse.json();
      // @ts-ignore
      const stars = repos.reduce((accumulator, repo) => {
        return accumulator + repo["stargazers_count"];
      }, 0);

      return {
        stars,
      };
    },
  });
