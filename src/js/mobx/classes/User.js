import mobx, { observable, action, computed, toJS } from 'mobx'
import Repo from './Repo'

const domain = 'https://github-finder-challenge.herokuapp.com/';



class User {
  @observable username = null;
  @observable profile = {};
  @observable repos = [];
  @observable searchPending = false;
  @observable searchError = '';
  @observable followers = [];
  @observable totalCommits = null;
  @observable commits = [];

  @observable repoStats = {
    maxStars: 0,
    minStars: 0
  }

  @computed get totalStars() {
    if (this.repos.length === 0) {
      return 0;
    }

    return this.repos.reduce( (sum, repo) => {
      return sum + repo.starCount;
    }, 0)
  }

  @computed get followersObj() {
    var ret = {};
    if (this.followers.length !== 0) {
      for (var i = 0; i < this.followers.length; i++) {
        const currentF = this.followers[i];
        ret[currentF.id] = currentF;
      }
    }

    return ret;
  }

  @action getSharedFollowers(user) {
    if (user.followers.length === 0 || this.followers.length === 0) {
      return [];
    } else {
      console.log('user2', typeof user.followers)
      var userFollowers = toJS(user.followers);
      return this.followers.filter( (follower) => {
        return user.followersObj[follower.id] !== undefined
      })
    }

  }

  @action resetUser() {
    this.username = null;
    this.profile = {};
    this.repos = [];
    this.searchError = '';
    this.followers = {};
  }

  @action getFollowers() {
    if (!this.username) {
      return;
    }

    fetch(`https://api.github.com/users/${this.username}/followers`, {
      method: 'get'
    })
    .then( (res) => {
      if (res.status !== 200) {        
        console.log('status:', res.status, res.statusText);
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then( (followers) => {
      console.log('response',followers)
      this.followers = followers;
    })
    .catch( (err) => {
      console.error('error', err)
      this.searchError = err.message;
      this.searchPending = false;
    })
  }

  @action setProfile(repo) {
    if (!repo) {
      return;
    }

    const user = repo.owner;

    this.profile = {
      username: user.login,
      avatar_url: user.avatar_url,
      url: user.html_url,
      api_url: user.url
    }

    this.getProfileSummary(user.url);
    this.getFollowers();
  }

  @action getProfileSummary(url) {
    fetch(url, {
      method: 'get'
    })
    .then( (res) => {
      if (res.status !== 200) {        
        console.log('status:', res.status, res.statusText);
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then( (user) => {
      this.profile.name = user.name;
      this.profile.followers = user.followers;
      this.profile.following = user.following;
      this.profile.email = user.email;
      this.profile.public_repos = user.public_repos;
      this.profile.created_at = user.created_at;
      this.profile.updated_at = user.updated_at;

      console.log(this.profile)
      this.searchPending = false;
    })
    .catch( (err) => {
      console.error('error', err)
      this.searchError = err.message;
      this.searchPending = false;
    })

  }

  @action findRepos(username) {
    this.resetUser();
    this.searchPending = true;

    fetch(`https://api.github.com/users/${username}/repos`, {
      method: 'get'
    })
    .then((res) => {
      if (res.status !== 200) {        
        console.log('status:', res.status, res.statusText);
        throw new Error(res.statusText)
      }
        return res.json()
      })
    .then((repos) => {
      this.username = username;
      this.setProfile(repos[0]);

      repos.forEach((repo) => {
        this.repos.push( new Repo(repo, username));

        if (repo.starCount > this.repoStats.maxStars) {
          this.repoStats.maxStars = repo.starCount;
        }
        if (repo.starCount < this.repoStats.minStars) {
          this.repoStats.minStars = repo.starCount;
        }

      })
      console.log('got ', repos.length, ' repos')
    })
    .catch( (err) => {
      console.error('error', err)
      this.searchError = err.message;
      this.searchPending = false;
    })
  }

  @action saveCommits(commits, username) {
    fetch(`${domain}commits/${username}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        commits: commits.items,
        totalCommits: commits.total_count
      }
    })
    .then(res => res.json())
    .then(data => console.log('ok', data))
    .catch(err => console.error('not ok', err))
  }

  @action getCommits() {
    console.log('get commits')
    if (!this.username) {
      return;
    }

    fetch(`${domain}commits/${this.username}`, {
      method: 'get'
    })
    .then( res => {
      if (res.status !== 200) {        
        console.log('status:', res.status, res.statusText);
        throw new Error(res.statusText)
      }
        return res.json()
    })
    .then( commits => {
      this.totalCommits = commits.total_count;
      this.commits = commits;
    })
    .catch( (err) => {
      console.log('err', err)
      fetch(`https://api.github.com/search/commits?q=author:${this.username}`, {
        method: 'get',
        headers: {
          'Accept': 'application/vnd.github.cloak-preview'
        }
      })
      .then((res) => {
        if (res.status !== 200) {        
          console.log('status:', res.status, res.statusText);
          throw new Error(res.statusText)
        }
          return res.json()
      })
      .then((commits) => {
        console.log('got commits for ', this.username, commits)
        this.totalCommits = commits.total_count;
        this.commits = commits;
        this.saveCommits(commits, this.username);
      })
      .catch( (err) => {
        console.error('error', err)
        this.searchError = err.message;
        this.searchPending = false;
      })
    })

  }
}

export default User;