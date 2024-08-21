import { Component, Input } from '@angular/core';
import { IUserData } from '../../../state_manager/interfaces';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) public userData!: IUserData;
}
