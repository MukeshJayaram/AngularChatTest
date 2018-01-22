import { MessageService } from './../shared/communication.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { TopicService } from '../shared/topic.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'topic-list',
  styleUrls: ['./topic-list.component.scss'],
  templateUrl: './topic-list.component.html',
})

export class TopicListComponent implements OnInit {
  org: string;
  topicList: Observable<any>;
  message: any;
  subscription: Subscription;
  isNotShow: boolean;

  /**
   * Creates an instance of TopicListComponent.
   * @param {TopicService} topicApi 
   * @param {ActivatedRoute} route 
   * @param {NgZone} zone 
   * @param {MessageService} messageService 
   * @memberof TopicListComponent
   */
  constructor(public topicApi: TopicService,
    private route: ActivatedRoute, private zone: NgZone,
    private messageService: MessageService) {
    this.isNotShow = false;
    this.subscription = this.messageService.getConnectionStatus()
      .subscribe(message => {
        this.isNotShow = message;
      });
  }

  ngOnInit() {
    this.refreshList();
  }

  /**
   * Delete topic
   * 
   * @param {any} id 
   * @memberof TopicListComponent
   */
  deleteTopic(id) {
    this.topicApi.delete(id)
      .subscribe(msg => {
        this.topicList = this.topicApi.getTopicList();
      });
  }

  /**
   * Get active topics
   * 
   * @memberof TopicListComponent
   */
  refreshList() {
    this.route.params.subscribe(params => {
      this.topicList = this.topicApi.getTopicList();
    });
  }
}
