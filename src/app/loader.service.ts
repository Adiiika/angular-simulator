import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  constructor() {
    
    setTimeout(() => {
      this.hideLoader();
    }, 2000)
  }

  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isLoading$ = this.loaderSubject.asObservable();

  showLoader() {
    this.loaderSubject.next(true);
  }

  hideLoader() {
    this.loaderSubject.next(false);
}

}