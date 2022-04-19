import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPageComponent } from './categories-page.component';

import { HttpClientModule } from '@angular/common/http';

describe('CategoriesPageComponent', () => {
  let component: CategoriesPageComponent;
  let fixture: ComponentFixture<CategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CategoriesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
