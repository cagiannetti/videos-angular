import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, provideRoutes } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';


@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [UserService, VideoService ]
})
export class VideoNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public video;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videoService: VideoService
  ) {
    this.page_title = 'Guardar un nuevo video favorito';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.video = new Video(1, this.identity.sub, '', '', '', '', null, null); //objeto que el formulario rellenará
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._videoService.create(this.token, this.video).subscribe(
      response =>{
        if(response.status=='success'){
          this.status = 'success';
          this._router.navigate(['/inicio']);
        }else{
          this.status = 'error';
        }
      },
      error=>{
        console.log(error);
        this.status = 'error';
      }
    );
  }

}
