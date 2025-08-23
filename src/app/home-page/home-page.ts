import { Component, inject } from '@angular/core';
import { SideBar } from '../side-bar/side-bar';
import { MessageService } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../modules/auth/auth-service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home-page',
  imports: [SideBar, RouterOutlet, Header],
  providers: [MessageService],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private authService = inject(AuthService);
  sideBarCollapesed!: boolean;

  ngOnInit() {}

  getCollapsedValue($event: boolean) {
  this.sideBarCollapesed = $event;
  }
}
