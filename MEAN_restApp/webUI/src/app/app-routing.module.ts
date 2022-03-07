import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IteamsComponent } from './components/iteams/iteams.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleiteamsComponent } from './components/singleiteams/singleiteams.component';
import { UpdateComponent } from './components/update/update.component';
import { UploadComponent } from './components/upload/upload.component';

import { AuthGuard } from './shared/guards/auth.guard';
const routes: Routes = [
    {path:'',component: LoginComponent},
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path:'items',component: IteamsComponent,
    canActivate:[AuthGuard]},
    {path:'item/:id',component: SingleiteamsComponent,
    canActivate:[AuthGuard]},
    {path:'upload',component: UploadComponent,
    canActivate:[AuthGuard]},
    {path:'update/:id',component: UpdateComponent,
    canActivate:[AuthGuard]},
    // {path:'delete/:id',},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
