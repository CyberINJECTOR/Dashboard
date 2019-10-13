import { StateService } from '../services/state.service';
import { HttpCallService } from '../services/http-call.service';
import { ReduxVariables } from '../models/redux';
import { User } from './profile/UserEntity/user-model';

export abstract class ProxyBaseComponent {
    protected abstract readonly tab: string;
    constructor(public httpService: HttpCallService, public stateService: StateService) {
    }

    initialize() {
        this.stateService.initializeLocalStorage(this.tab);
        this.httpService.getUserProfile('getUsers').subscribe(result => {
          let newUser = new User(result);
          let newUserInRedux = [{
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            profileDescription: newUser.profileDescription,
            company: newUser.company,
            city: newUser.city,
            password: newUser.password,
            urlImg: newUser.urlImg
          }]
          this.stateService.addItem(ReduxVariables.updateUser, newUserInRedux);
        })
    }
}
