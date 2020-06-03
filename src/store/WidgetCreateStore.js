import { decorate, action, observable } from 'mobx';

class WidgetCreateStore {
  actionConfiguration = {};
  reactionConfiguration = {};

  updateActionConfig = config => this.actionConfiguration = config;
  updateReactionConfig = config => this.reactionConfiguration = config;

}

decorate(WidgetCreateStore, {
  actionConfiguration: observable,
  reactionConfiguration: observable,
  updateActionConfig: action,
  updateReactionConfig: action
});

export default new WidgetCreateStore;