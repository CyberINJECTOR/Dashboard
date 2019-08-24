import { Component, OnInit, Input } from '@angular/core';
import { User, IUser } from '../UserEntity/user-model';
import { HttpCallService } from 'src/app/services/http-call.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  constructor(private httpService: HttpCallService) {
  }

  ngOnInit() {
    this.httpService.getUserProfile('getUsers').subscribe((user: User) => {
      this.user = user;
      const newUser = new User(user);
      this.id = newUser.id;
      this.name = newUser.name;
      this.profileDescription = newUser.profileDescription;
      this.email = newUser.email;
      this.urlImg = newUser.urlImg;
      this.company = newUser.company;
      this.city = newUser.city;
      // this.user = new User(newUser);
    });
  }

}
