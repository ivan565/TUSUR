import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {Task} from '../models/task'

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

const API_URL: string = 'http://perscontrol.azurewebsites.net/api/v1';

@Injectable()
export class TaskData {
  public http: Http;

  public constructor(http: Http) {
    this.http = http;
  }

  public getTasksByEngineer(id: number): Observable<Task[]> {
    return this.http.get(`${API_URL}/engineers/${id}/tasks`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public finishTask(task: Task, geoPosition, image) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let body = {
      'comment': task.task_description,
      'end_time': task.start_time,
      'gps_longitude': geoPosition.coords.longitude,
      'gps_latitude': geoPosition.coords.latitude,
      'photo_link': image
    };

    return this.http.post(`${API_URL}/tasks/${task.id_task}/finish`, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }
}
