import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page-components/home/home.component';
import { EventoComponent } from './page-components/evento/evento.component';
import { ImagenComponent } from './page-components/imagen/imagen.component';
import { ProfileComponent } from './page-components/profile/profile.component';
import { DashboardComponent } from './page-components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'Task_and_Notes', component: HomeComponent },
  { path: 'evento', component: EventoComponent },
  { path: 'imagen', component: ImagenComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/Task_and_Notes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
