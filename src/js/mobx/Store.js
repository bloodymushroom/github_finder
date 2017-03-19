import mobx, { observable, action, computed, toJS } from 'mobx'

class User {
  @observable username;
  @observable profile = {};
  @observable repos = [];
  @observable searchPending = false;
  @observable searchError = '';
  @observable followers = [];
  @observable totalCommits = null;

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

  @action getCommits() {
    if (!this.username) {
      return;
    }

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
      this.totalCommits = commits.total_count;
    })
    .catch( (err) => {
      console.error('error', err)
      this.searchError = err.message;
      this.searchPending = false;
    })
  }
}

class Repo {
  starGazers = [];
  contents = [];

  constructor(repo, owner) {
    this.repo = repo;
    this.owner = owner;
    this.name = repo.name;
    this.fullName = repo.full_name;
    this.url = repo.html_url;
    this.description = repo.description;
    this.starCount = repo.stargazers_count;
    this.created_at = repo.created_at;

    // this.getContents();
  }

  getStargazers() {

  }

  getContents() {
    const endpoint = `https://api.github.com/repos/${this.owner}/${this.name}/contents/`;

    fetch(endpoint, {
      method: 'get'
    })
    .then((res) => {
      if (res.status !== 200) {        
        console.log('status:', res.status, res.statusText);
        throw new Error(res.statusText)
      }
        return res.json()
    })
    .then( contents => {
      contents.forEach( content => {
        this.contents.push(new Content(content))
      })
    })
    .catch( err => {
      console.log('error in contents', err)
    })
  }
}

class Content {
  constructor(content) {
    this.name = content.name;
    this.bodyUrl = content.url;

    this.transformContents(content.url);
  }

  transformContents(url) {
    fetch(url, {
      method: 'get'
    })
    .then((res) => {
      if (res.status !== 200) {        
        console.log('status:', res.status, res.statusText);
        throw new Error(res.statusText)
      }
        return res.json()
    })
    .then((code) => {
      this.code = code.content.split('\n');
      console.log('code', this.code);
    })
    .catch( err => {
      console.log('error in contents', err)
    })
  }
}


class Store {
  @observable number = 0;
  @observable currentView = 'user';
  @observable activeUser = 'User 1';
  @observable comparisonPending = false;
  @observable showSnackbar = false;
  @observable searchedUser = null;

  @action incrementNumber() {
    this.number++;
  }

  @action sayHello() {
    console.log('hello')
  }

  @action login() {
    fetch('https://github.com/login/oauth/authorize', {
      method: 'get',
      mode: 'no-cors'
    })
    .then( (res) => res.json() )
    .then( (token) => {
      localStorage.setItem('githubToken', 'token');
      console.log('got token', token, localStorage.getItem('githubToken'))
    })
    .catch( (err) => {
      console.log('error', err)
    })
  }

  @action hasBeenSearched(user) {
    console.log('in searched')
    fetch('http://127.0.0.1:3003/search', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        username: user
      }
    })
    .then( res => res.json())
    .then( search => {
      if(search.wasSearched) {
        this.searchedUser = search;
        this.showSnackbar = true;
        setTimeout( () => this.showSnackbar = false, 3000)
        console.log('user was searched', user, search.timesSearched)
      } else {
        console.log('user was not searched')
      }
    })
    .catch( err => console.log(err))
  }
}

const user1 = new User();
const user2 = new User();
const store = new Store();

export { user1, user2 };

export default store;