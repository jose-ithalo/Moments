import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';
import Moment from 'src/app/interfaces/Moments';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {

  btnText: string = 'Compartilhar!';

  constructor(
    private momentService: MomentsService,
    private messageService: MessagesService,
    private router: Router
  ) { }

  createHandler(moment: Moment) {
    console.log(moment);

    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    this.momentService.createMoment(formData).subscribe({
      next: () => {
        this.messageService.add('Momento adicionado com sucesso!');
        this.router.navigate(['/']);
      }
    });



  }

}
