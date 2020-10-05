//router 
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importamos componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VideoNewComponent } from './components/video-new/video-new.component';

//importamos servicios
import { IdentityGuard } from './services/identity.guard'; //para resguardar ciertas rutas
import { VideoEditComponent } from './components/video-edit/video-edit.component';

//definimos rutas
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent},
    {path: 'inicio/:page', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard]},
    {path: 'guardar-favorito', component: VideoNewComponent, canActivate: [IdentityGuard]},
    {path: 'editar-favorito/:id', component: VideoEditComponent, canActivate: [IdentityGuard]},
    {path: 'error', component: ErrorComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);