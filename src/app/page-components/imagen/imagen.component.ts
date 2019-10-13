import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpCallService } from 'src/app/services/http-call.service';
import { ReduxService } from 'src/app/services/redux-service.service';
import { ReduxVariables } from 'src/app/models/redux';
import { Image } from '../imagen/image-model';
import { ProxyBaseComponent } from '../proxy-base.component';
import { StateService } from 'src/app/services/state.service';
import { Page } from '../entity/page';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.scss']
})
export class ImagenComponent extends ProxyBaseComponent implements OnInit {
  public form: FormGroup;
  public isTextBoxEmpty: boolean;
  public isMaxLength: boolean;
  public isString: boolean;
  public idEvent: number;
  public arrayList: Image[];
  protected readonly tab = Page.image;


  public account_validation_messages = {
    'id': [
      { type: 'required', message: 'Username is required' },
      { type: 'minLength', message: 'You must enter at least one number' },
      { type: 'maxLength', message: 'You cant enter more than just five number' },
      { type: 'pattern', message: 'You cant enter characters' },
    ],
  }

  constructor(private formBuilder: FormBuilder,
    http: HttpCallService,
    stateService: StateService) {
    super(http, stateService);
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required,
      Validators.minLength(1),
      Validators.maxLength(5),
      Validators.pattern('[0-9]*')]
      )]
    });
  }

  ngOnInit() {
    this.initialize();
  }
}
