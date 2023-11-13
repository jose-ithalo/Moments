import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';
import Moment from 'src/app/interfaces/Moments';
import Comment from 'src/app/interfaces/Comments';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseUrl = environment.baseApiUrl;

  iconEdit = faEdit;
  iconDelete = faTimes;

  inputText: string | null = null;
  inputName: string | null = null;

  constructor(
    private momentService: MomentsService,
    private messsagesService: MessagesService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getOneMoment(id).subscribe((item) => (this.moment = item.data));
  }

  removeHandler(id: number): void {

    this.momentService.deleteMoment(id).subscribe();

    this.messsagesService.add('Momento excluído com sucesso!');

    this.router.navigate(['/']);

  }

  onSubmit() {

    if (this.inputText === null || this.inputName === null) {
      this.inputText = '';
      this.inputName = '';
      return
    }

    const momentId: number = Number(this.moment!.id);

    const data: Comment = {
      text: this.inputText,
      username: this.inputName,
      momentId: momentId
    }

    this.commentService.createComment(data).subscribe((comment) => {
      this.moment!.comments!.push(comment.data);
    });

    this.messsagesService.add('Comentário adicionado');

    this.inputText = null;
    this.inputName = null;
  }
}
