import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Moment from '../interfaces/Moments';
import Response from '../interfaces/Responses';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {

  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) { }

  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  createMoment(formDate: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formDate);

  }
}
