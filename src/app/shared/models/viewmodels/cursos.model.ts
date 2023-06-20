import { VideoViewModel } from 'app/shared/models/viewmodels/video.model';

export class CursoViewModel {
    course_id: number = 0;
    name: string = "";
    content: string = "";
    description: string = "";
    course_url: string = "";
    update_timestamp: string = "";
    active: boolean = false;
    video_list: number[] = [];
    videos: VideoViewModel[] = [];
    interactive: boolean = false;
    learning: string[] = [];
    index: string[] = [];
    constructor(){

    }
}
