import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsSelectorComponent } from './tabs-selector.component';

describe('TabsSelectorComponent', () => {
  let component: TabsSelectorComponent;
  let fixture: ComponentFixture<TabsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
