import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { IUserData } from '../../../../state_manager/interfaces';
import { NgStyle } from '@angular/common';
import { PreviewDirective } from '../../../../../../shared/src/lib/directives/preview/preview.directive';
import { PreviewComponentComponent } from '../../../../../../shared/src/lib/directives/preview/preview-component/preview-component.component';
import { RouterLink } from '@angular/router';
import { routerUtility } from '../../../../../../shared/src/lib/utilities/router.utility';
import { BaseUserCardComponent } from '../../base-user-card.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgStyle, PreviewDirective, PreviewComponentComponent, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent extends BaseUserCardComponent {
  @ViewChild('previewOutlet', { read: ViewContainerRef, static: true })
  public previewOutletRef!: ViewContainerRef;
}
