import { decorate, observable, action, computed } from "mobx";

class UserStore {

  name = '';
  profileImage = '';
  url = '';
  actionConfig = '';
  reactionConfig = '';

  updateName = name => this.name = name;
  updateProfileImage = image => this.profileImage = image;
  updateUrl = url => this.url = 'http://' + url;
  updateActionConfig = config => this.actionConfig = config;
  updateReactionConfig = config => this.reactionConfig = config;

};

decorate(UserStore, {
  name: observable,
  profileImage: observable,
  url: observable,
  updateName: action,
  updateProfileImage: action,
  updateUrl: action,


  actionConfig: observable,
  reactionConfig: observable,
  updateActionConfig: action,
  updateReactionConfig: action,

});

export default new UserStore;