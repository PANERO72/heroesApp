import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroeComponent } from "./pages/heroe/heroe.component";
import { HeroesComponent } from "./pages/heroes/heroes.component";

const routes: Routes = [
  { path: 'heroe/:id', component: HeroeComponent, data: { titulo: 'Heroe' }},
  { path: 'heroes', component: HeroesComponent, data: { titulo: 'Heroes' } },
  { path: '**', pathMatch: 'full', redirectTo: '/heroes' },
  { path: '', pathMatch: 'full', redirectTo: '/heroes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }