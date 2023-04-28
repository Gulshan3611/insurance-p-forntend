import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGstComponent } from './edit-gst.component';

describe('EditGstComponent', () => {
  let component: EditGstComponent;
  let fixture: ComponentFixture<EditGstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
