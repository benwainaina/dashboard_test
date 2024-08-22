import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { PreviewDirective } from '../../../../../../shared/src/lib/directives/preview/preview.directive';
import { PreviewComponent } from '../../../../../../shared/src/lib/directives/preview/preview-component/preview-component.component';
import { RouterLink } from '@angular/router';
import { BaseUserCardComponent } from '../../base-user-card.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgStyle, PreviewDirective, PreviewComponent, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent extends BaseUserCardComponent {
  @ViewChild('previewOutlet', { read: ViewContainerRef, static: true })
  public previewOutletRef!: ViewContainerRef;
}
