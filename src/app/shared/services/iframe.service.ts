import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IFrameService {

  private srcSubject = new Subject<string>();

  srcObservable$: Observable<string> = this.srcSubject.asObservable();

  constructor() {
  }

  changeSrc(incomingSrc) {
    this.srcSubject.next(incomingSrc);
  }
}
