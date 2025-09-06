import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimComponentComponent } from './sim-component.component';

describe('SimComponentComponent', () => {
  let component: SimComponentComponent;
  let fixture: ComponentFixture<SimComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
