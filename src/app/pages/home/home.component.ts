import { Component, OnInit } from '@angular/core';

import { MomentsService } from 'src/app/services/moments.service';
import Moment from 'src/app/interfaces/Moments';
import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = [];
  chosenMoments: Moment[] = [];
  baseUrl = environment.baseApiUrl;

  iconSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentsService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data: Moment[] = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      });

      this.allMoments = data;
      this.chosenMoments = data;
    });
  }

  search(evt: Event): void {
    const target = evt.target as HTMLInputElement;
    const value = target.value;

    this.chosenMoments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value.toLowerCase());
    });

  }
}
