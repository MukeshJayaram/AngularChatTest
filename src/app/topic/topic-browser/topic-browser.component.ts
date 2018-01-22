//* Landing component for topics
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TopicService } from '../shared/topic.service';
import { MessageService } from '../shared/communication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'topic-browser',
  templateUrl: './topic-browser.component.html',
  styleUrls: ['./topic-browser.component.scss']
})
export class TopicBrowserComponent {

  message: any;
  subscription: Subscription;
  isNotShow: boolean = false;

  /**
   * Creates an instance of TopicBrowserComponent.
   * @param {Router} router 
   * @param {TopicService} github 
   * @param {MessageService} messageService 
   * @param {Location} location 
   * @memberof TopicBrowserComponent
   */
  constructor(private router: Router,
    private github: TopicService,
    private messageService: MessageService,
    private location: Location) {
    this.subscription = this.messageService.getConnectionStatus()
      .subscribe(message => {
        this.isNotShow = message;
      });
  }

  createNewTopic(topicName: string) {
    this.messageService.createServer(topicName);
    this.router.navigateByUrl('/topics/' + topicName + '/');
  }

}
