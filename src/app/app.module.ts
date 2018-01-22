//* App module bootstraps the application as a whole
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { rootRouterConfig } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { TopicBrowserComponent } from './topic/topic-browser/topic-browser.component';
import { TopicListComponent } from './topic/topic-list/topic-list.component';
import { TopicDetailComponent } from './topic/topic-detail/topic-detail.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TopicService } from './topic/shared/topic.service';
import { MessageService } from './topic/shared/communication.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopicBrowserComponent,
    TopicListComponent,
    TopicDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    TopicService,
    MessageService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
