import { Component, Input } from '@angular/core';
import { IUserData } from '../../../state_manager/interfaces';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) public id!: number;
  @Input({ required: true }) public email!: string;
  @Input({ required: true }) public firstName!: string;
  @Input({ required: true }) public lastName!: string;
  @Input({ required: true }) public image!: string;
}
