import { Component, OnInit } from '@angular/core';
import { EntityBase } from './page-components/home/Entities/Entity-base';
import { HttpCallService } from './services/http-call.service';
import { MatSnackBar } from '@angular/material';
import { Accion } from './page-components/home/Entities/Accion-enum';
import { ReduxService } from './services/redux-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sideBarIsOpened = false;
  showAlert: boolean;
  durationInSeconds = 5;
  constructor(private httpService: HttpCallService,
              private snackBar: MatSnackBar,
              private redux: ReduxService) {
  }

  ngOnInit() {
    this.httpService.getObservableValue().subscribe((result: EntityBase) => {
      switch (result.accion) {
        case (Accion.Save): {
          this.snackBar.open( result.entity + ' Saved Succesfully', result.entity + ' OK', {
            duration: 4000,
          });
          break;
        }
        case (Accion.Update): {
          this.snackBar.open( result.entity + ' Update Succesfully', result.entity + ' OK', {
            duration: 4000,
          });
          break;
        }
        case (Accion.Delete): {
          this.snackBar.open( result.entity + ' Deleted Succesfully', result.entity + ' OK', {
            duration: 4000,
          });
          break;
        }
      }
    });

    this.redux.getObservableValue().subscribe((result: any) => {
      switch (result.label) {
        case (Accion.updateUser): {
          this.snackBar.open( result.value.name + ' Updated Succesfully', result.label + ' OK', {
            duration: 4000,
          });
          break;
        }
      }
    });


    
  }

  openSnackBar() {

  }
  toggleUniversalToolBar() {
    this.sideBarIsOpened = !this.sideBarIsOpened;
    console.log(this.sideBarIsOpened);
  }
}
