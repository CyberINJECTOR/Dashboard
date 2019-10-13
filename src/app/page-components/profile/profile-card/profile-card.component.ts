import { Component, OnInit, Input } from '@angular/core';
import { User, IUser, UserUpdate } from '../UserEntity/user-model';
import { HttpCallService } from 'src/app/services/http-call.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ReduxService } from 'src/app/services/redux-service.service';
import { ReduxVariables } from 'src/app/models/redux';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  user: User;
  id: number;
  name: string;
  profileDescription: string;
  email: string;
  urlImg: string;
  company: string;
  city: string;
  password: string;

  public formGroup: FormGroup;
  constructor(private httpService: HttpCallService,
              private formBuilder: FormBuilder,
              private http: HttpCallService,
              private stateService: StateService) {
    let newUser : User = null;
    this.getUserProfile(newUser).subscribe((result: any) => {
      console.log(result);
    })
  }

  private getUserProfile(newUser: User): Observable<void> {
    return this.httpService.getUserProfile('getUsers').pipe(
      map((user: User) => {
      newUser = new User(user);
      this.id = newUser.id;
      this.name = newUser.name;
      this.password = newUser.password
      this.profileDescription = newUser.profileDescription;
      this.email = newUser.email;
      this.urlImg = newUser.urlImg;
      this.company = newUser.company;
      this.city = newUser.city;

    })).pipe((
      map(()  => {
      this.buildForm(newUser);
    })));
  }

  private buildForm(newUser: User){
    this.formGroup = this.formBuilder.group({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      profileDescription: newUser.profileDescription,
      company: newUser.company,
      city: newUser.city,
      password: newUser.password,
      urlImg: newUser.urlImg
    });
    console.log(this.formGroup);
  }

  ngOnInit() {

  }

  updateProfile(e: any) {
    let newUser = new UserUpdate(e);
    this.http.update('updateUser', newUser);
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
    console.log(newUser);
  }
}
