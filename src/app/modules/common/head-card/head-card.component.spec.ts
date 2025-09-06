import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadCardComponent } from './head-card.component';

describe('HeadCardComponent', () => {
  let component: HeadCardComponent;
  let fixture: ComponentFixture<HeadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
