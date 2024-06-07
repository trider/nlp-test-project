import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {COMMA, ENTER, J} from '@angular/cdk/keycodes';
import { CommonModule, JsonPipe, DecimalPipe } from '@angular/common';;
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';







export interface TAGS {
  name: string;
  type?: string;
}



@Component({
  selector: 'app-opening-sentence',
  standalone: true,
  template: `<form [formGroup]="form" >
  <mat-form-field class="example-chip-list"  >
  <mat-chip-grid #chipGrid aria-label="Enter tags">
      <div  *ngFor="let tag of tags" >
        <mat-chip class="" *ngIf="tag.type==='tag'" >{{displayTag(tag.name)}}</mat-chip>
        <div *ngIf="tag.type==='text'" style="padding:10px">{{tag.name}}</div>
      </div>
    <input placeholder=""    
      
      [matChipInputFor]="chipGrid"
      [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
      [matChipInputAddOnBlur]="addOnBlur"
      (matChipInputTokenEnd)="add($event)"/>
  </mat-chip-grid>
</mat-form-field>
<mat-chip-set >
  <mat-chip class="assigned-chip" (click)="addTag(tag)"   *ngFor="let tag of tagsAvailable" >{{displayTag(tag.name)}}</mat-chip>
  
</mat-chip-set>


`, 
  styles: [`
  .example-chip-list {
    width: 100%;
    height:100%;

    
  }

  .mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
    background-color: #5a55f4;
    color: #fff;
    width: fit-content;
    margin:auto;
    margin-top: 0.75%;
    justify-content: left;
    text-align: center;
  
    
}

.mat-mdc-standard-chip {
  --mdc-chip-label-text-color: #fff;
}




  .assigned-chip{
    background-color: #e0e0e0;
  
  }
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }`

],
  imports: [
    CommonModule,
    JsonPipe,
    DecimalPipe, 
    MatFormFieldModule, 
    MatChipsModule, 
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
    
  ],

  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {
        appearance: 'outline',
        boderStyle: 'none',
        borderColor: 'primary'
      },
    
    },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: {
       backgroundColor: 'primary',
      },
    
    },
    {
    
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpeningSentenceComponent),
      multi: true
    }
  ]
  
  
})
export class OpeningSentenceComponent{
  @Output() tagsEvent = new EventEmitter<any>();
  form = new FormGroup({
    name: new FormControl(),
    phone: new FormControl('123-456-7890'),
    tags:new FormControl()
  });

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: TAGS[] = [
    {name: 'Hi, this is', type: 'text'},
    {name: '[Agent Name]', type: 'tag'},
    {name: 'I\'m calling from', type: 'text'},
    {name: ', do you have a few minutes to answer some questions.', type: 'text'},
    
  ];
  tagsAvailable: TAGS[] = [ 

    {name: '[Agent Name]', type: 'tag'},
    {name: '[Company Name]', type: 'tag'},
    {name: '[First Name]', type: 'tag'},
    {name: '[Last Name]', type: 'tag'},


  ]
  val:any=null
  onChange = (value: any) => {
    this.tagsEvent.emit(this.tags);
  };
  onTouched = () => {};
  set value(val: any) {  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }
  

  displayTag(name:string){
    return name.replace('[','').replace(']','')
  }

 


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

   
      if (value && value.includes('[') && value.includes(']')) {
        this.addTag({name: value, type: 'tag'});
      }
      else  {
       this.tags = [
        ...this.tags,
        {name: value, type: 'text'}
       ]
      }

      
    

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tags: TAGS): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);

      // this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tags:TAGS, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tags);
      return;
    }

    // Edit existing tag
    const index = this.tags.indexOf(tags);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }

  addTag(tag: any){
    this.tags = [
      ...this.tags,
      tag
    ]

    this.value = this.tags
    

    if(this.tagsAvailable.filter(t=>t.name===tag.name).length<1){
      this.tagsAvailable = [
        ...this.tagsAvailable,
        tag
      ]
    }
    
  }



  writeValue(value: any): void {
    this.value = value;
  
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
   
    this.onChange(this.tags)
   
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.writeValue(this.tags)
   

  
  }

}
