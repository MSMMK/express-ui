import { Component, Inject, Input, input, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgLogo } from "../modules/commons/svg-logo/svg-logo";
import { AuthService } from '../modules/auth/auth-service';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, ButtonModule, RouterLink, RouterLinkActive, SvgLogo],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {
  @Input() sidebarCollapsed = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // toggleSidebar() {
  //   this.sidebarCollapsed = !this.sidebarCollapsed;
  // }

  ngOnInit() {
    if (this.isBrowser && window.innerWidth < 768) {
      this.sidebarCollapsed = true;
    }
  }

  logout() {
      this.authService.logout();
}
}
