import { Injectable } from '@angular/core';
import Alert from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {

    constructor(private router: Router) { }

    cerrarAlerta() {
        Alert.close();
    }

    successAlert(text: string) {
        return Alert.fire({
          icon: 'success',
          title: 'Exito',
          text: text,
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          customClass:{
            confirmButton: 'btn btn-success',
            popup: 'custom-alerts',
          },
          buttonsStyling: false,
          allowOutsideClick: false
        })
    }

    warningAlert(text: string) {
        return Alert.fire({
          icon: "warning",
          title: "Advertencia",
          text: text,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          customClass:{
            confirmButton: 'btn btn-danger',
            popup: 'custom-alerts',
          },
          buttonsStyling: false,
          allowOutsideClick: false
        });
    }

    errorAlert(text: string) {
        return Alert.fire({
          icon: "error",
          title: "Error",
          text: text,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          customClass:{
            confirmButton: 'btn btn-danger',
            popup: 'custom-alerts',
          },
          buttonsStyling: false,
          allowOutsideClick: false
        });
    }

    errorAlertNavigate(text: string, link: string) {
        return Alert.fire({
          icon: "error",
          title: "Error",
          text: text,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          customClass:{
            confirmButton: 'btn btn-danger',
            popup: 'custom-alerts',
          },
          buttonsStyling: false,
          allowOutsideClick: false
        }).then((result) => {
            this.router.navigate([link])
        });
    }
}
