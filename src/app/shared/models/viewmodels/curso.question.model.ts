import { PerfilViewModel } from 'app/shared/models/viewmodels/perfil.model';
import { PhotoViewModel } from 'app/shared/models/viewmodels/photo.model';
import { CursoAnswerViewModel } from 'app/shared/models/viewmodels/curso.answer.model';

export class CursoQuestionViewModel {
    question_id: number = 0;
    course_id: number = 0;
    question: string = "";
    question_timestamp: string = "";
    user: PerfilViewModel;
    photo: PhotoViewModel;
    answers: CursoAnswerViewModel[] = [];
    constructor(){

    }
}
