//* Chat in a particular active topic
import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TopicService } from '../shared/topic.service';
import { MessageService } from '../shared/communication.service';

declare var Peer: any;
@Component({
  selector: 'topic-detail',
  styleUrls: ['./topic-detail.component.scss'],
  templateUrl: './topic-detail.component.html'
})
export class TopicDetailComponent implements OnInit {


  private org: string;
  private topic: string;
  public topicDetails: any = {};

  message: any;
  subscription: Subscription;
  messageList: Array<string> = [];
  peerName: string;
  /**
   * Creates an instance of TopicDetailComponent.
   * @param {TopicService} topicApi 
   * @param {NgZone} zone 
   * @param {ActivatedRoute} route 
   * @param {Router} router 
   * @param {MessageService} messageService 
   * @memberof TopicDetailComponent
   */
  constructor(public topicApi: TopicService, private zone: NgZone,
    private route: ActivatedRoute, private router: Router,
    private messageService: MessageService) {
    this.listenToChat();
  }
  /**
   * End chat if refreshed or window closed
   * 
   * @param {any} event 
   * @memberof TopicDetailComponent
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.endChat();
  }

  endChat() {
    let href = location.href;
    this.messageService.endChatSync(href.match(/([^\/]*)\/*$/)[1]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.org = this.route.snapshot.parent.params['org'];
      this.topic = params['id'] || '';
      if (this.topic) {
        this.topicApi.gettopicDetail(this.topic)
          .subscribe(topicDetails => {
            if (topicDetails) {
              this.topicDetails = topicDetails;
              this.messageService.createClient(this.topicDetails.name, this.topicDetails.serverID)
            } else {
              this.router.navigateByUrl('/topics/');
            }
          });
      }
    });
  }
  /**
   * unsubscribe on destroy to ensure no memory leaks
   * 
   * @memberof TopicDetailComponent
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sendMessage(txt: string) {
    this.messageService.sendChat(txt, 'Chat', this.peerName);
  }

  /**
   * Get chat and update chat list
   * 
   * @memberof TopicDetailComponent
   */
  listenToChat() {
    this.subscription = this.messageService.getChatToDisplay()
      .subscribe(message => {
        this.message = message;
        this.zone.run(() => {
          this.messageList.push(this.message.text);
        });
      });
  }

  logout() {
    let href = location.href;
    this.messageService.endChatSync(href.match(/([^\/]*)\/*$/)[1], true);
  }

}
