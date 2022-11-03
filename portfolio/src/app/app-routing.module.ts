
import { AboutComponent } from './about/about.component';
import { WeatherComponent } from './weather/weather.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'weather', component: WeatherComponent},
  {path: 'about', component: AboutComponent},
  {path: '', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingPages = [WeatherComponent,AboutComponent]
