import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CameramodalComponent } from './cameramodal.component';

describe('CameramodalComponent', () => {
  let component: CameramodalComponent;
  let fixture: ComponentFixture<CameramodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameramodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CameramodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
