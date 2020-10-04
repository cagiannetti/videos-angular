import { Injectable  } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { User } from '../models/user';
import { UserService } from './user.service';

//Uso el decorador injectable para que se convierta en un servicio inyectable
@Injectable()
export class IdentityGuard implements CanActivate{

    constructor(
        private _router: Router,
        private _userService: UserService
    ){

    }
    canActivate(){
        let identity = this._userService.getIdentity();

        if(identity){
            return true;
        }else{
            this._router.navigate(['/login']);
            return false;
        }
    }
}