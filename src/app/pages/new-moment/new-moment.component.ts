import { Component } from '@angular/core';

import { MomentsService } from 'src/app/sercices/moments.service';
import Moment from 'src/app/interfaces/Moments';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {

  btnText: string = 'Compartilhar!';

  constructor(private momentService: MomentsService) { }

  async createHandler(moment: Moment) {
    console.log(moment);

    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    this.momentService.createMoment(formData).subscribe();

  }

}
