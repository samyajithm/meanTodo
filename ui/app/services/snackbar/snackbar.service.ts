import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { snackBarData } from '../../types/snackbar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
constructor(private toastr: ToastrService,
              private translate: TranslateService) {
  }

  // get translated value from i18n
  translateMessage(key: string, translateData?: any): string {
    let translatedString: string = '';
    return this.translate.instant(key, translateData)
      /*.subscribe(response => {
      translatedString = response;
    });*/
    // return translatedString;
  }

  /* Display toaster/snackbar on the top */
  open(type: 'success' | 'error' | 'warning' | 'info', message?: snackBarData, title?: snackBarData, config?: any): void {
    let toastrMessage: string;
    let toastrTitle: string;

    if (message && message.data) {
      if (message.translate) {
        toastrMessage = this.translateMessage(message.data, message.translateData);
      } else {
        toastrMessage = message.data;
      }
    } else {
      toastrMessage = '';
    }

    if (title && title.data) {
      if (title.translate) {
        toastrTitle = this.translateMessage(title.data, title.translateData);
      } else {
        toastrTitle = title.data;
      }
    } else {
      toastrTitle = this.translateMessage('notify.' + type.toLowerCase());
    }

    switch (type.toLowerCase()) {
      case 'success':
        this.toastr.success(toastrMessage, toastrTitle, config || {timeOut: 1000});
        break;
      case 'error':
        this.toastr.error(toastrMessage, toastrTitle, config || {timeOut: 3000});
        break;
      case 'warning':
        this.toastr.warning(toastrMessage, toastrTitle, config || {timeOut: 3000});
        break;
      case 'info':
        this.toastr.info(toastrMessage, toastrTitle, config || {timeOut: 3000});
        break;
      default:
        this.toastr.success(toastrMessage, toastrTitle, config || {timeOut: 3000});
        break;
    }
  }

  /* Close all the displayed snackbars */
  closeAll(timeout ?: number) {
    if (timeout) {
      setTimeout(() => this.toastr.clear(), timeout);
    } else {
      this.toastr.clear()
    }
  }
}
