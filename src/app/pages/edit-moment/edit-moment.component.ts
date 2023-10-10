import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MomentsService } from 'src/app/services/moments.service';
import Moment from 'src/app/interfaces/Moments';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: Moment;
  btnText: string = 'Editar';

  constructor(private momentService: MomentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getOneMoment(id).subscribe((item) => (this.moment = item.data));
  }

}
