import { PersistentMap, context } from 'near-sdk-as';
import { User } from './user';

@nearBindgen
export class Contract {
  private userMap: PersistentMap<string, User> = new PersistentMap<
    string,
    User
  >('users');

  setProfileImageSrc(profileImageSrc: string): void {
    const unsername = context.sender;
    assert(context.sender == context.predecessor);
    const user: User = this.getOrInitUser(unsername);
    user.profileImageSrc = profileImageSrc;
  }

  private getOrInitUser(username: string): User {
    if (this.userMap.contains(username)) {
      return this.userMap.getSome(username);
    } else {
      const user = new User(username);
      this.userMap.set(username, user);
      return user;
    }
  }
}
