import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-loading-overlay',
    imports: [CommonModule, ProgressSpinnerModule],
    template: `
  @if (show) {
    <div class="overlay">
      <p-progress-spinner
      ariaLabel="loading"
      strokeWidth="2"
      fill="transparent"
      animationDuration="1.5s"
      [style]="{ width: '150px', height: '150px' }"/>
    </div>
  }
  `,
    styles: [`
    .overlay {
      position: fixed;
      top: 50%;
      left: 50%;
      // width: 100%;
      // height: 100%;
      background: #00000000;
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class LoadingOverlayComponent {
  @Input() show = false;
  @Input() text = 'Loading...';
}
