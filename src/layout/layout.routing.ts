import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { SimpleComponent } from './pages/simple/simple.component';
import { AdvancedComponent } from './pages/advanced/advanced.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  { path: '', redirectTo: 'layout', pathMatch: 'full' },
  { path: 'layout', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'simple', pathMatch: 'full' },
      { path: 'simple', component: SimpleComponent },
      { path: 'advance', component: AdvancedComponent },
    ]},
    { path: '**', component: ErrorComponent },
];

export const LayoutRoutes: any[] = [];

export const routing = RouterModule.forRoot(routes);
