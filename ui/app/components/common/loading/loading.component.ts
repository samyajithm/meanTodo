import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from "../../../services/loading/loading.service";
import {Subscription} from "rxjs/index";

/*
*  Generic loader component for the entire app by managing state(State Management)
*
* */

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  loading = false;
  loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loadstatus.subscribe((value: boolean) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
