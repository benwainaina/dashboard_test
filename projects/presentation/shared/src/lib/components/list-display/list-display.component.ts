import { Component, Input } from '@angular/core';
import { NgComponentOutlet, NgFor } from '@angular/common';
import { UserCardComponent } from '../../../../../user/src/lib/components/user-card/user-card.component';

@Component({
  selector: 'app-list-display',
  standalone: true,
  imports: [NgFor, NgComponentOutlet],
  templateUrl: './list-display.component.html',
  styleUrl: './list-display.component.scss',
})
export class ListDisplayComponent {
  @Input({ required: true }) public listItems: Array<any> = [];
}
