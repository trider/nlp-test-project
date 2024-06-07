import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OpeningSentenceComponent } from './opening-sentence.component';

describe('OpeningSentenceComponent', () => {
  let component: OpeningSentenceComponent;
  let fixture: ComponentFixture<OpeningSentenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OpeningSentenceComponent,
        NoopAnimationsModule
      
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpeningSentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
