import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrmodalComponent } from './qrmodal.component';

describe('QrmodalComponent', () => {
  let component: QrmodalComponent;
  let fixture: ComponentFixture<QrmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrmodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
