import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs/index";

/*
*  Loader/spinner Service to set app level Loading
* */

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingStatus: BehaviorSubject<any> = new BehaviorSubject(false);
  public readonly loadstatus: Observable<any> = this.loadingStatus.asObservable();

  /* Start Loading */
  startLoading() {
    this.loadingStatus.next(true);
  }

  /* Stop Loading */
  stopLoading() {
    this.loadingStatus.next(false);
  }
}
