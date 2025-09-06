import { User } from './../models/user';
import { Component, inject, Input, OnInit, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../modules/auth/auth-service';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, NgClass, TitleCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private authService = inject(AuthService);
  userName?: string;
  branchName?: string;
  profileImageUrl!: string
  @Input() isCollapse = false;

  collapsed = false;
  emitIsCollapsed = output<boolean>();

  ngOnInit(): void {
    const user: User = this.authService.userDetails;
    this.userName = user?.username;
    this.branchName = this.authService.userBranch?.nameAr;
    if (user?.profileImage) {
      this.profileImageUrl =   user?.profileImage
    }else {
      this.profileImageUrl = 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png';
    }
  }


  onSearch(): void {
    console.log('Search button clicked');
  }

  onMenuClick(): void {
    console.log('Menu button clicked');
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.emitIsCollapsed.emit(this.collapsed);
  }
}
