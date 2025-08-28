import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfograficaComponent } from './infografica.component';

describe('InfograficaComponent', () => {
  let component: InfograficaComponent;
  let fixture: ComponentFixture<InfograficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfograficaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfograficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
