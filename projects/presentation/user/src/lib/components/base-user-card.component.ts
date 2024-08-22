import { Component, Input } from '@angular/core';

@Component({
  template: '',
})
export class BaseUserCardComponent {
  @Input({ required: true }) public id!: string;
  @Input({ required: true }) public email!: string;
  @Input({ required: true }) public firstName!: string;
  @Input({ required: true }) public lastName!: string;
  @Input({ required: true }) public image!: string;
  @Input({ required: true }) public pageNum!: string;
}
