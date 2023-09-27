import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: string = '';

  constructor() { }

  add(msg: string) {
    this.message = msg;

    setTimeout(() => {
      this.clearMsg();
    }, 4000);
  }

  clearMsg() {
    this.message = '';
  }
}

