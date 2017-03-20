import mobx, { observable, action, computed, toJS } from 'mobx'

const domain = 'https://github-finder-challenge.herokuapp.com/'
// const domain = 'http://localhost:3000/';

import User from './classes/User'
import Repo from './classes/Repo'

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
        throw new Error(res.statusText)
      }
        return res.json()
    })
    .then((code) => {
      this.code = code.content.split('\n');
    })
    .catch( err => {
      console.log('error in contents', err)
    })
  }
}


class Store {
  @observable number = 0;
  @observable currentView = 'user';
  @observable activeUser = null;
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
    fetch(`${domain}search/${user}`, {
      method: 'get'
    })
    .then( res => res.json())
    .then( search => {
      if(search.wasSearched) {
        this.searchedUser = search;
        this.showSnackbar = true;
        setTimeout( () => this.showSnackbar = false, 2000)
      } else {
        return;
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