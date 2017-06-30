import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, ProfileManagerComponent, AuthGuard } from './index';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: ProfileManagerComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' }
    // { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
