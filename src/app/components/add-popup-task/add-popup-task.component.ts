import { Component, OnInit } from '@angular/core';
import { EntityInsertTasksAndNotes } from 'src/app/page-components/home/Entities/Entity-insert-model';
import { HttpCallService } from 'src/app/services/http-call.service';

@Component({
  selector: 'app-add-popup-task',
  templateUrl: './add-popup-task.component.html',
  styleUrls: ['./add-popup-task.component.scss']
})
export class AddPopupTaskComponent implements OnInit {

  selectedValue: string;
  public textArea: string;

  constructor(private httpService: HttpCallService) { }

  ngOnInit() {
  }

  selectvalue(value: string) {
    this.selectedValue = (value === 'Task' ? 'Task' : 'Note');
  }

  AddEntity(selectedValue: string) {
    const request = new EntityInsertTasksAndNotes();
    request.entity = selectedValue;
    request.value = this.textArea;
    this.httpService.insert('insert' + request.entity, request);
  }
}
