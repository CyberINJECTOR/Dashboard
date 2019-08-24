import { Component, OnInit, Output } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { HttpCallService } from 'src/app/services/http-call.service';
import { User } from './UserEntity/user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() {
   }

  ngOnInit() {
  }

}
