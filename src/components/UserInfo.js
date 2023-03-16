export default class UserInfo {
  constructor({nameElementSelector, aboutElementSelector}, requester) {
    this._nameElementSelector = nameElementSelector;
    this._aboutElementSelector = aboutElementSelector;

    this.data = requester();
  }



  getUserInfo() {
    this._requester.then(res => this._res = res);
    return this.data;
  }



  setUserInfo() {
    
  }



  renderData() {
    this._nameElementSelector.textContent = '';
    this._aboutElementSelector.textContent = '';
  }
}