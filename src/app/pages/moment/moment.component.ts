import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { MomentsService } from 'src/app/services/moments.service';
import Moment from 'src/app/interfaces/Moments';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseUrl = environment.baseApiUrl;

  iconEdit = faEdit;
  iconDelete = faTimes;

  constructor(private momentService: MomentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getOneMoment(id).subscribe((item) => (this.moment = item.data));
  }
}
