import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }

  showToastVMsg(msg: string, title: string, icon: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: icon,
      title: title,
      text: msg
    });
  }

  showToast(title: string, icon: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: icon,
      title: title
    });
  }

  showNotification(msg: string, title: string, icon: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: msg,
      showConfirmButton: false
    });
  }
}
