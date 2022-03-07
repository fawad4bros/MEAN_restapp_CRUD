import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleiteamsComponent } from './singleiteams.component';

describe('SingleiteamsComponent', () => {
  let component: SingleiteamsComponent;
  let fixture: ComponentFixture<SingleiteamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleiteamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleiteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
