import { Component, OnInit } from '@angular/core';
import { HttpCallService } from 'src/app/services/http-call.service';
import { Tasks } from './Entities/Task-model';
import { Notes } from './Entities/Notes-model';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskArrayList: Tasks[];
  noteArrayList: Notes[];

  constructor(private httpCall: HttpCallService) {
    this.httpCall.getAllEvents('getAllTasks').subscribe((res: Tasks[]) => {
      this.taskArrayList = res;
    });

    this.httpCall.getAllEvents('getAllNotes').subscribe((res: Notes[]) => {
      this.noteArrayList = res;
    });
  }

  ngOnInit() {

  }

}
