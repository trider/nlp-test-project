import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { OpeningSentenceComponent } from 'src/app/components/opening-sentence/opening-sentence.component';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    OpeningSentenceComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  external:any = "external"
  form = new FormGroup({
    name: new FormControl(),
    phone: new FormControl('123-456-7891'),
    tags:new FormControl()
  });


  getTags(tags:any){ 
    this.form.controls.tags.setValue({tags: tags});
  }

  onSubmit() {
    alert('Thanks for submitting! Data: ' + JSON.stringify(this.form.value));
  }

}
