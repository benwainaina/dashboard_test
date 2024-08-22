import { NgStyle } from '@angular/common';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { PreviewDirective } from '../../../../../../shared/src/lib/directives/preview/preview.directive';
import { PreviewComponentComponent } from '../../../../../../shared/src/lib/directives/preview/preview-component/preview-component.component';
import { RouterLink } from '@angular/router';
import { BaseUserCardComponent } from '../../base-user-card.component';

@Component({
  selector: 'app-mini-user-card',
  standalone: true,
  imports: [NgStyle, PreviewDirective, PreviewComponentComponent, RouterLink],
  templateUrl: './mini-user-card.component.html',
  styleUrl: './mini-user-card.component.scss',
})
export class MiniUserCardComponent extends BaseUserCardComponent {
  @ViewChild('previewOutlet', { read: ViewContainerRef, static: true })
  public previewOutletRef!: ViewContainerRef;
}
