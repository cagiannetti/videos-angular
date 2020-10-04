import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, VideoService]
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public videos;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService
  ) {
    this.page_title = "Mis videos"; 
  }

  ngOnInit(): void {
    this.loadUser();
    this.getVideos(); 
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(){
    this._videoService.getVideos(this.token).subscribe(
      response=>{
        this.videos = response.videos;
      },
      error=>{
        console.log(error);
      }
    );
  }

  getThumb(url, size) {
    var video, results, thumburl;
    
     if (url === null) {
         return '';
     }
     
     results = url.match('[\\?&]v=([^&#]*)');
     video   = (results === null) ? url : results[1];
    
     if(size != null) {
         thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
     }else{
         thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
     }
    
      return thumburl;
        
    }
}
