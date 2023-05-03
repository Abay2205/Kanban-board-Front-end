import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateColumnComponent } from './update-column.component';

describe('UpdateColumnComponent', () => {
  let component: UpdateColumnComponent;
  let fixture: ComponentFixture<UpdateColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
