//* Application routes are defined here
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TopicBrowserComponent } from './topic/topic-browser/topic-browser.component';
import { TopicListComponent } from './topic/topic-list/topic-list.component';
import { TopicDetailComponent } from './topic/topic-detail/topic-detail.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'topics', component: TopicBrowserComponent,
    children: [
      { path: '', component: TopicListComponent },
      { path: ':topic', component: TopicListComponent,
        children: [
          { path: '', component: TopicDetailComponent },
          { path: ':id', component: TopicDetailComponent }
        ]
      }]
  }
];

