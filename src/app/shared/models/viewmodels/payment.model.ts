import { MembresiaViewModel } from 'app/shared/models/viewmodels/membresia.model';

export class PaymentViewModel {
    operation_timestamp: string = "";
    amount: number = 0;
    membership: MembresiaViewModel;
    constructor(){

    }
}

