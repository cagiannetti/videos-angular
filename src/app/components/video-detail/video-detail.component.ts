import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, provideRoutes } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; //importar videos de youtube, saltar restricciones Angular

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers: [UserService, VideoService ]
})
export class VideoDetailComponent implements OnInit {

  public identity;
  public token;
  public video;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videoService: VideoService,
    private _sanitizer: DomSanitizer
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  } 

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(){
    this._route.params.subscribe(
      params=>{
        var id = +params['id'];
        this._videoService.getVideo(this.token, id).subscribe(
          response=>{
            if(response.status == 'success'){
              this.video = response.video;
            }else{
              this._router.navigate(['/inicio']);
            }
          },
          error=>{
            console.log(error);
            this.status='error';
          });
      });
  }

  /* Método para conseguir el id del video de youtube, limpia la url para poder embeberla */
  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
  }
}
