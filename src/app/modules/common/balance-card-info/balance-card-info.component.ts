import { Component, Input } from '@angular/core';
import { SimModel } from '../../../models/sim-model';

@Component({
  selector: 'app-balance-card-info',
  imports: [],
  templateUrl: './balance-card-info.component.html',
  styleUrl: './balance-card-info.component.scss'
})
export class BalanceCardInfoComponent {

  @Input() sim!: SimModel
}
