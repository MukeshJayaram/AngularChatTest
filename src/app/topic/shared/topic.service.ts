//* To CRD the active topics from DB in the topics page
import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiPath } from '../../config/apiPath';


@Injectable()
export class TopicService {
  constructor(private http: Http) { }

  /**
   * Get active list of topics
   * 
   * @returns 
   * @memberof TopicService
   */
  getTopicList() {
    return this.makeRequest(``);
  }

  /**
   * Get details of topic
   * 
   * @param {string} id 
   * @returns 
   * @memberof TopicService
   */
  gettopicDetail(id: string) {
    return this.makeRequest(`${id}`);
  }

  /**
   * 
   * Make get request to server 
   * @private
   * @param {string} path 
   * @returns 
   * @memberof TopicService
   */
  private makeRequest(path: string) {
    let params = new URLSearchParams();

    let url = `${ApiPath.topicURL}${path}`;
    return this.http.get(url, { search: params })
      .map((res) => res.json());
  }

  /**
   * 
   * Create new topic - POST request
   * @param {string} name 
   * @param {string} serverID 
   * @returns 
   * @memberof TopicService
   */
  createTopic(name: string, serverID: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = `${ApiPath.topicURL}`;

    return this.http.post(url, JSON.stringify({ name: name, serverID: serverID }), options)
      .map((res) => res.json());
  }

  /**
   * 
   * Delete topic
   * @param {string} id 
   * @returns 
   * @memberof TopicService
   */
  delete(id: string) {
    let params = new URLSearchParams();

    let url = `${ApiPath.topicURL}${id}`;
    return this.http.delete(url, { search: params })
      .map((res) => res.json());
  }
}
