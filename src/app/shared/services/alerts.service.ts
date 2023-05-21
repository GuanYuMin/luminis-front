import { Injectable } from '@angular/core';
import Alert from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {

    constructor() { }

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
}
