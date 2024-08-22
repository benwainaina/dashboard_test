import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _rootApiPath: string = 'https://reqres.in/api';

  public get(path: string, params: any): Observable<any> {
    return this._httpClient.get(`${this._rootApiPath}/${path}?${params}`);
  }

  public post(path: string, payload: any): Observable<any> {
    return this._httpClient.post(`${this._rootApiPath}/${path}`, payload);
  }
}
