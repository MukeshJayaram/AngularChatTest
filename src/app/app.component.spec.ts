import { TopicBrowserComponent } from './topic/topic-browser/topic-browser.component';
import { rootRouterConfig } from './app.routes';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLinkStubDirective, RouterOutletStubComponent } from './../../test/router-stubs';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopicDetailComponent } from './topic/topic-detail/topic-detail.component';
import { TopicListComponent } from './topic/topic-list/topic-list.component';
import { FormsModule } from '@angular/forms';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(rootRouterConfig), FormsModule],
      declarations: [
        AppComponent, RouterLinkStubDirective, RouterOutletStubComponent,
        HomeComponent, TopicBrowserComponent, TopicDetailComponent,
        TopicListComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h3 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Angular Topic - Forum');
  }));
});
