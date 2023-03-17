export default class UserInfo {
  constructor({nameElementSelector, aboutElementSelector}, api) {
    this._nameElementSelector = nameElementSelector;
    this._aboutElementSelector = aboutElementSelector;

    this._nameElement = document.querySelector(this._nameElementSelector);
    this._aboutElement = document.querySelector(this._aboutElementSelector);

    this._api = api;
  }



  getUserInfo() {
    return JSON.parse(sessionStorage.getItem('user-data'));
  }



  setUserInfo(data) {
    this._api.updateUserInfo(data)
        .then((res) => {
          this._nameElement.textContent = res.name;
          this._aboutElement.textContent = res.about;

          sessionStorage.setItem('user-data', JSON.stringify(res))
        })
        .catch((err) => {
          console.error(err);
        })
  }



  renderData() {
    this._userData = this.getUserInfo();
    this._nameElement.textContent = this._userData.name;
    this._aboutElement.textContent = this._userData.about;
  }
}