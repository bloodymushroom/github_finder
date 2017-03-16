import mobx, { observable, action, computed } from 'mobx'

class User {
  @observable username;
  @observable profile = {};
  @observable repos = [];
  @observable searchPending = false;
  @observable searchError = '';

  @action resetUser() {
    this.username = null;
    this.profile = {};
    this.repos = [];
    this.searchError = '';
  }

  @action setProfile(repo) {
    if (!repo) {
      return;
    }

    console.log('set profile')
    const user = repo.owner;

    this.profile = {
      username: user.login,
      avatar_url: user.avatar_url,
      url: user.url
    }

    console.log("profile: ", this.profile)
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
        this.repos.push({
          stars: repo.stargazers_count
        })
      })
      console.log('got ', repos.length, ' repos')
      this.searchPending = false;
    })
    .catch( (err) => {
      console.error('error', err)
      this.searchError = err.message;
      this.searchPending = false;
    })
  }
}

class Store {
  @observable number = 0;

  @action incrementNumber() {
    this.number++;
  }

  @action sayHello() {
    console.log('hello')
  }
}

const user1 = new User();
const user2 = new User();
const store = new Store();

export { user1, user2 };

export default store;