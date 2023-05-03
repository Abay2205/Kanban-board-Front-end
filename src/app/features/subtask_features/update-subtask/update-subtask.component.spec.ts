import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubtaskComponent } from './update-subtask.component';

describe('UpdateSubtaskComponent', () => {
  let component: UpdateSubtaskComponent;
  let fixture: ComponentFixture<UpdateSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubtaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
