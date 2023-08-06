import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrsPlnDashboardComponent } from './crs-pln-dashboard.component';

describe('CrsPlnDashboardComponent', () => {
  let component: CrsPlnDashboardComponent;
  let fixture: ComponentFixture<CrsPlnDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrsPlnDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrsPlnDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
