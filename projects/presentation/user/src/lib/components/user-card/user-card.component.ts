import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { IUserData } from '../../../state_manager/interfaces';
import { NgStyle } from '@angular/common';
import { PreviewDirective } from '../../../../../shared/src/lib/directives/preview/preview.directive';
import { PreviewComponentComponent } from '../../../../../shared/src/lib/directives/preview/preview-component/preview-component.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgStyle, PreviewDirective, PreviewComponentComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) public id!: string;
  @Input({ required: true }) public email!: string;
  @Input({ required: true }) public firstName!: string;
  @Input({ required: true }) public lastName!: string;
  @Input({ required: true }) public image!: string;
  @Input({ required: true }) public pageNum!: string;
  @ViewChild('previewOutlet', { read: ViewContainerRef, static: true })
  public previewOutletRef!: ViewContainerRef;
}
