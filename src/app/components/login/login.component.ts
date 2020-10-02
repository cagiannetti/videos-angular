import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  
  public page_title:string;
  public user: User;
  public identity;
  public status: string;
  public token: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "Identifícate";
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
  }
  
  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form){
    //console.log(this.user);
    this._userService.signup(this.user).subscribe(
      response => {
        if(!response.status || response.status !== 'error'){
          this.status = 'success';
          this.identity = response;

          //Sacar el token hacemos otra petición
          this._userService.signup(this.user, true).subscribe(
            response => {
              if(!response.status || response.status !== 'error'){
                this.token = response;
                
                //persistimos los datos de sesión en el front
                console.log(this.identity);
                localStorage.setItem('identity', JSON.stringify(this.identity));
                console.log(this.token);    
                localStorage.setItem('token', this.token);

                //una vez logueado redireccionamos a inicio
                this._router.navigate(['/inicio']);

                
              }else{
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );

        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  /* Método logout recibe parámetro "sure" por url (un "1") que significa que elusuario quiere cerrar sesión */
  logout(){
    this._route.params.subscribe(
      params=>{
        let sure = +params['sure']; //con el + lo convierto a entero

        if(sure == 1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          this.identity = null;
          this.token = null;

          this._router.navigate(['/inicio']);
        }
      }
    );
  }
}
