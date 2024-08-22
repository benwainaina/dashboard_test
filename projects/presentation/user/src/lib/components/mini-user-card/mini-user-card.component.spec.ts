import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniUserCardComponent } from './mini-user-card.component';

describe('MiniUserCardComponent', () => {
  let component: MiniUserCardComponent;
  let fixture: ComponentFixture<MiniUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniUserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
