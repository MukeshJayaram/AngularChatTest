//*Home Component
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../topic/shared/communication.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private messageApi: MessageService) {

  }
  ngOnInit() {
  }
}
