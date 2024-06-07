import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { JsonPipe } from '@angular/common';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainRoutingModule,
    HomeComponent,
    NgbModule,
    JsonPipe
  ]
})
export class MainModule { }
