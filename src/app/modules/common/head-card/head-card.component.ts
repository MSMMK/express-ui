import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-head-card',
  imports: [CardModule, CurrencyPipe, CommonModule],
  templateUrl: './head-card.component.html',
  styleUrl: './head-card.component.scss'
})
export class HeadCardComponent {
  item = input<any>();
}
