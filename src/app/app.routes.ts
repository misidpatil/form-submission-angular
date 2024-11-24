import { Routes } from '@angular/router';
import { DetailsComponent } from './details.component';
import { FormComponent } from './form.component';
import { ListComponent } from './list.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: FormComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', redirectTo: '' }
];

