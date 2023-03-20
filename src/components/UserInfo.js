import Api from "./Api";
export default class UserInfo {
  constructor({nameElementSelector, aboutElementSelector, avatarSelector}/*, api*/) {
    this._nameElementSelector = nameElementSelector;
    this._aboutElementSelector = aboutElementSelector;
    this._avatarSelector = avatarSelector;

    this._nameElement = document.querySelector(this._nameElementSelector);
    this._aboutElement = document.querySelector(this._aboutElementSelector);
    this._avatarElement = document.querySelector(this._avatarSelector)


    //this._api = api;
  }



  getUserInfo() {
    return JSON.parse(sessionStorage.getItem('user-data'));
  }

  setUserInfo(data) {
    console.log(data)
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;

    if(data.avatar) {
      this._avatarElement.src = data.avatar;
    }
    sessionStorage.setItem('user-data', JSON.stringify(data))
  }



  renderData() {
    this._userData = this.getUserInfo();
    this._nameElement.textContent = this._userData.name;
    this._aboutElement.textContent = this._userData.about;
    this._avatarElement.src = this._userData.avatar
  }
}