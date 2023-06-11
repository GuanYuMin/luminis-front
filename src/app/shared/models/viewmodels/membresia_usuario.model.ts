import { MembresiaViewModel } from 'app/shared/models/viewmodels/membresia.model';
import { CursoViewModel } from 'app/shared/models/viewmodels/cursos.model';

export class UserMembershipViewModel {
    period_start_date: string = "";
    period_end_date: string = "";
    membership: MembresiaViewModel;
    courses: CursoViewModel[] = [];
    constructor(){

    }
}

