import mobx, { observable, action, computed, toJS } from 'mobx'

const domain = 'http://localhost:3003/';


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

export default Repo;