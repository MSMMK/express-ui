import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  userName = 'Jane Doe';
  branchName = 'New York Branch';
  branchAddress = '123 Main St, New York, NY 10001';
  status = 'Active';
  employeesCount = 25;
  revenue = '$1.2M';
  collapsed = false;
  emitIsCollapsed = output<boolean>();

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
