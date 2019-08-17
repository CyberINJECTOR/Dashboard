import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule,
         MatMenuModule, MatListModule, MatExpansionModule, MatInputModule, MatCheckboxModule, MatTooltipModule,
         MatChipsModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomeComponent } from './page-components/home/home.component';
import { EventoComponent } from './page-components/evento/evento.component';
import { ImagenComponent } from './page-components/imagen/imagen.component';
import { ProfileComponent } from './page-components/profile/profile.component';
import { DashboardComponent } from './page-components/dashboard/dashboard.component';
import { AddPopupTaskComponent } from './components/add-popup-task/add-popup-task.component';
import { EditProfileComponent } from './page-components/profile/edit-profile/edit-profile.component';
import { ProfileCardComponent } from './page-components/profile/profile-card/profile-card.component';
import { HttpClientModule } from '@angular/common/http';
import { UniversalToolbarComponent } from './page-components/universal-toolbar/universal-toolbar.component'
import { StateService } from './services/state.service';
import { HttpCallService } from './services/http-call.service';
import { UniversalToolbarContainerComponent } from './page-components/universal-toolbar/universal-toolbar-container/universal-toolbar-container.component';
import { EditPopupTaskComponent } from './components/edit-popup-task/edit-popup-task.component';
import { DeletePopupTaskComponent } from './components/delete-popup-task/delete-popup-task.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopBarComponent,
    HomeComponent,
    EventoComponent,
    ImagenComponent,
    ProfileComponent,
    DashboardComponent,
    AddPopupTaskComponent,
    EditProfileComponent,
    ProfileCardComponent,
    UniversalToolbarComponent,
    UniversalToolbarContainerComponent,
    EditPopupTaskComponent,
    DeletePopupTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [StateService, HttpCallService, SidebarComponent],
  entryComponents: [AddPopupTaskComponent, EditPopupTaskComponent, DeletePopupTaskComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
