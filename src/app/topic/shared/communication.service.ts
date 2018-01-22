//* Service to handle all the Peerjs related stuff
import { LicenseKey } from './../../config/licenseKey';
import { ApiPath } from './../../config/apiPath';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TopicService } from './topic.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

declare var Peer: any;

@Injectable()
export class MessageService {
  private subject = new Subject<any>();
  API_KEY: String = LicenseKey.peerJS;
  conn: any;
  hash: String;
  peer: any;
  server: any;
  myID: string;
  isServer: Boolean;

  /**
   * Creates an instance of MessageService.
   * @param {Router} router 
   * @param {TopicService} topicApi 
   * @param {Location} location 
   * @memberof MessageService
   */
  constructor(private router: Router,
    public topicApi: TopicService,
    private location: Location) { }

  displayChat(message: string) {
    this.subject.next({ text: message });
  }

  isConnected(connection: boolean) {
    this.subject.next(connection);
  }

  getConnectionStatus(): Observable<any> {
    return this.subject.asObservable();
  }

  getChatToDisplay(): Observable<any> {
    return this.subject.asObservable();
  }

  createServer(topic: string, name?: string) {
    this.isServer = true;
    let msg = this.createNode(topic, name);
  }

  createClient(topic: string, serverID: string, name?: string) {
    this.isServer = false;
    this.server = serverID;
    this.createNode(topic, name);
  }

  deletePeer() {
    if (this.peer) {
      this.peer.destroy();
    }
  }

  /**
   * Create node and listen to incoming data
   * 
   * @param {string} topic 
   * @param {string} [name] 
   * @memberof MessageService
   */
  createNode(topic: string, name?: string) {
    this.deletePeer();
    this.peer = new Peer({ key: this.API_KEY });
    this.peer.on('open', (id) => {
      this.myID = id;
      this.isConnected(true);
      if (this.isServer) {
        this.topicApi.createTopic(topic, this.myID)
          .subscribe(msg => {
            this.location.go('/topics/' + topic + '/' + msg.id);
          })
      } else {
        this.connectToID(this.server);
      }
    });

    /**
     * Open peerJS connection
     */
    this.peer.on('connection', (conn) => {
      this.conn = conn;
      conn.on('open', () => {
        conn.on('data', (data) => {
          let message = data.message;
          if (this.isServer && message) {
            this.displayChat(message);
            for (var key in this.peer.connections) {
              let data = { message: message, id: this.myID, type: 'Chat' };
              this.peer.connections[key][0].send(data);
            }
          }
        });
      });
    });
  }

  /**
   * Connect to another peer 
   * listen for incoming data
   * 
   * @param {any} peerID 
   * @memberof MessageService
   */
  connectToID(peerID) {
    this.conn = this.peer.connect(peerID);
    var call = this.peer.call(peerID);
    this.conn.on('open', () => {
      this.conn.on('data', (data) => {
        let message = data.message;
        switch (data.type) {
          case 'Chat':
            this.displayChat(message);
            break;
        }
      });
    });
  }

  /**
   * Send chat to peer
   * Client node to server node
   * Server node bradcast to all nodes
   * 
   * @param {string} message 
   * @param {string} type 
   * @param {string} [name] 
   * @memberof MessageService
   */
  sendChat(message: string, type: string, name?: string) {
    let displayName = name || this.myID;
    message = displayName + ': ' + message;
    let data = { message: message, id: this.myID, type: type };
    if (this.isServer) {
      this.displayChat(message);
      for (var key in this.peer.connections) {
        let data = { message: message, id: this.myID, type: 'Chat' };
        this.peer.connections[key][0].send(data);
      }
    } else {
      this.conn.send(data);
    }
  }

  logout() {
    this.endChatSync(this.myID, true);
  }

  /**
   * End connection
   * Client node: Close connection and send notice
   * Server node: Close server and delete topic
   * 
   * @param {string} id 
   * @param {boolean} [logout] 
   * @memberof MessageService
   */
  endChatSync(id: string, logout?: boolean) {
    if (this.isServer) {
      this.sendChat('Server closed', 'Chat', this.myID);
      if (!logout) {
        let xhr = new XMLHttpRequest()
        xhr.open("DELETE", ApiPath.topicURL + id, false);
        xhr.send();
      } else {
        this.topicApi.delete(id)
          .subscribe(msg => {
            this.peer.destroy();
            this.router.navigateByUrl('/');
          });
      }
    } else {
      this.sendChat('Closed connection', 'Chat', this.myID);
      this.router.navigateByUrl('/');
    }
    this.isConnected(false);
  }
}