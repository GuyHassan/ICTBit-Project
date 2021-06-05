import UserModel from '../models/User.model';
import { action, makeObservable, observable, autorun } from 'mobx';

/**
 * mobx store
 * currentUser - create a new user on mobx
 * 
 */

export class CurrentUserStore {
  currentUser: UserModel = new UserModel(NaN, '');

  constructor() {
    makeObservable(this, {
      currentUser: observable,
      addUser: action,
      clearUser: action,
    })
  }
  addUser(age: number, name: string) {
    this.currentUser = new UserModel(age, name);
  }
  clearUser() {
    this.currentUser = new UserModel(NaN, '')
  }
}



const currentUserStore = new CurrentUserStore();

// on each modify mobx he call this function and display the new propeties on mobx on a broswer console
autorun(() => {
  const { Age, Name } = currentUserStore.currentUser
  console.log('inital new user: ', Age, Name);
})

export { currentUserStore };