import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionSalonComponent } from './edition-salon.component';

describe('EditionSalonComponent', () => {
  let component: EditionSalonComponent;
  let fixture: ComponentFixture<EditionSalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditionSalonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
