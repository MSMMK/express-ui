import { Routes } from "@angular/router";
import { Login } from "./login/login";
import { Register } from "./register/register";

export const routes: Routes = [
  {path: 'login', component: Login},
  {path: 'signup', component: Register},
  {path: '**', redirectTo: 'login'},
]
