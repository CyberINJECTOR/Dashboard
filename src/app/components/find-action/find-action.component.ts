import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpCallService } from 'src/app/services/http-call.service';
import { ReduxService } from 'src/app/services/redux-service.service';
import { ReduxVariables } from 'src/app/models/redux';
import { Image } from '../../page-components/imagen/image-model'
import { StateService } from 'src/app/services/state.service';
import { LocalStorageVariables } from 'src/app/models/local-storage';


@Component({
  selector: 'app-find-action',
  templateUrl: './find-action.component.html',
  styleUrls: ['./find-action.component.scss']
})
export class FindActionComponent implements OnInit {

  // public form: FormGroup;
  // public isTextBoxEmpty: boolean;
  // public isMaxLength: boolean;
  public isFindPanelVisible: boolean = false;
  public idEvent: number;
  public arrayList: Image[];

  options: FormGroup;

  constructor(fb: FormBuilder,
    private state: StateService) {
    this.options = fb.group({
      color: 'primary',
      fontSize: [1, Validators.compose([Validators.required,
                                         Validators.min(0)])]
    });
  }

  getFontSize() {
    return Math.max(10, this.options.value.fontSize);
  }

  ngOnInit() {
    this.state.getObservableValue<boolean>(ReduxVariables.showFindPanel).subscribe(value => {
      this.isFindPanelVisible = value;
    });
  }

  onSubmit(form: any) {
    let id = form.value.fontSize;
    this.idEvent = id;
  }

  getArrayImgByEventId(form: any) {
    let id: string  = form.value.fontSize;
    this.state.addItem(ReduxVariables.eventId, id);
    // this.redux.addItemToStoreRedux(ReduxVariables.eventId, id);
  }

}
