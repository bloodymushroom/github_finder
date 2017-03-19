export function repoStarChart(repos, minStars, maxStars) {
  var repoHash = {};

  var increment = Math.floor(maxStars - minStars)/10

  repos.forEach( (repo) => {
    if (repo.starCount > maxStars) {
      maxStars = repo.starCount;
    }
    if (repo.starCount < minStars) {
      minStars = repo.starCount;
    }

  })
}