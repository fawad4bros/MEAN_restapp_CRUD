import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IteamsComponent } from './iteams/iteams.component';
import { SingleiteamsComponent } from './singleiteams/singleiteams.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { UploadComponent } from './upload/upload.component';
import { UpdateComponent } from './update/update.component';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    IteamsComponent,
    SingleiteamsComponent,
    UploadComponent,
    UpdateComponent,

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatGridListModule,
    RouterModule,
    MatIconModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule,
    FlexLayoutModule,

  ],
  exports: [
    UploadComponent,
  IteamsComponent],
  providers:[{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1000}
  }]
})
export class ComponentsModule { }
