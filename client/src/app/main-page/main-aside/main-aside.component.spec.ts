import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAsideComponent } from './main-aside.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

describe('MainAsideComponent', () => {
  let component: MainAsideComponent;
  let fixture: ComponentFixture<MainAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule
      ],
      declarations: [ MainAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
