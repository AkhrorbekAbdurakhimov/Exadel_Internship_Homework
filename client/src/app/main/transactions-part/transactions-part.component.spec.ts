import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsPartComponent } from './transactions-part.component';

describe('TransactionsPartComponent', () => {
  let component: TransactionsPartComponent;
  let fixture: ComponentFixture<TransactionsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
