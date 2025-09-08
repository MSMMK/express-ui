import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCardInfoComponent } from './balance-card-info.component';

describe('BalanceCardInfoComponent', () => {
  let component: BalanceCardInfoComponent;
  let fixture: ComponentFixture<BalanceCardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceCardInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
