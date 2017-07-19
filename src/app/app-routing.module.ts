import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    LoginComponent, ProfileManagerComponent, AuthGuard,
    BasicProfileComponent, SkillsComponent, ExperienceComponent,
    CalculationComponent, ScoreComponent,
} from './index';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: ProfileManagerComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: 'profile', component: BasicProfileComponent },
            { path: 'skills', component: SkillsComponent },
            { path: 'experience', component: ExperienceComponent },
            { path: 'calculation', component: CalculationComponent },
            { path: 'score', component: ScoreComponent },
        ]
    },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
