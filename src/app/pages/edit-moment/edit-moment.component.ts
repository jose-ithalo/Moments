import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';
import Moment from 'src/app/interfaces/Moments';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: Moment;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentsService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getOneMoment(id).subscribe((item) => (this.moment = item.data));
  }

  editHandler(momentData: Moment) {

    const id: number = this.moment.id;

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    this.momentService.updateMoment(id, formData).subscribe({
      next: () => {
        this.messagesService.add('Momento atualizado com sucesso!');
        this.router.navigate(['/']);
      }
    });
  }

}
