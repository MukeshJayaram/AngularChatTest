//* List of active topics
import { Http, HttpModule } from '@angular/http';
import { MessageService } from './../shared/communication.service';
import { HomeComponent } from './../../home/home.component';
import { FormsModule } from '@angular/forms';
import { rootRouterConfig } from './../../app.routes';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkStubDirective, RouterOutletStubComponent } from './../../../../test/router-stubs';
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';

import { TopicBrowserComponent } from './../topic-browser/topic-browser.component';
import { TopicDetailComponent } from '../topic-detail/topic-detail.component';
import { TopicListComponent } from '../topic-list/topic-list.component';
import { TopicService } from '../shared/topic.service';

describe('TopicListComponent (templateUrl)', () => {

  let comp: TopicListComponent;
  let fixture: ComponentFixture<TopicListComponent>;

  let topicService: TopicService;
  let spy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(rootRouterConfig), FormsModule,  HttpModule],
      declarations: [TopicBrowserComponent, RouterLinkStubDirective, RouterOutletStubComponent,
        HomeComponent, TopicBrowserComponent, TopicDetailComponent,
        TopicListComponent],
      providers: [TopicService, {
        provide: HttpXhrBackend,
        useClass: MockBackend
      }, MessageService],
    });


    fixture = TestBed.createComponent(TopicListComponent);

    comp = fixture.componentInstance;
    topicService = fixture.debugElement.injector.get(TopicService);
    spy = spyOn(topicService, 'getTopicList')
      .and.returnValue(Promise.resolve({ 'name': 'sample' }));
  });


  it('should not show topic before OnInit', () => {
    expect(spy.calls.any()).toBe(false, 'getTopicList not yet called');
  });

});

