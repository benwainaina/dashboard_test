import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { PreviewComponent } from './preview-component/preview-component.component';
import { IPreviewPosition } from '../../../../../../state_manager/shared/interfaces';

@Directive({
  selector: '[previewDirective]',
  standalone: true,
})
export class PreviewDirective implements OnInit {
  private _hostElement: ElementRef<HTMLDivElement> = inject(ElementRef);

  @Input({ required: true }) public userId!: string;
  @Input({ required: true }) public previewOutlet!: any;

  ngOnInit(): void {
    this._listenForHoverOnHost();
  }

  private _listenForHoverOnHost(): void {
    this._hostElement.nativeElement.addEventListener('mouseenter', (ev) =>
      this._attachPreview(
        this._calculatePreviewPlacement(
          this._hostElement.nativeElement.getBoundingClientRect()
        )
      )
    );

    this._hostElement.nativeElement.addEventListener('mouseleave', (ev) =>
      this._detachPreview()
    );
  }

  private _calculatePreviewPlacement(domRect: DOMRect): IPreviewPosition {
    const {
      x: hostX,
      y: hostY,
      height: hostHeight,
      width: hostWidth,
    } = domRect;
    const {
      width: listWidth = 0,
      height: listHeight = 0,
      x: listStartX = 0,
      y: listStartY = 0,
    } = this._hostElement.nativeElement
      .closest('app-list-display')
      ?.parentElement?.getBoundingClientRect() || {};

    const listCenterX = listStartX + listWidth / 2;
    const listCenterY = listStartY + listHeight / 2;
    let placementPosition: IPreviewPosition = {
      zone: 'd',
      hostX,
      hostY,
      hostCenterY: hostY + hostHeight / 2,
      hostCenterX: hostX + hostWidth / 2,
    };
    if (hostX < listCenterX && hostY < listCenterY) {
      placementPosition.zone = 'd';
    } else if (hostX < listCenterX && hostY > listCenterY) {
      placementPosition.zone = 'b';
    } else if (hostX > listCenterX && hostY < listCenterY) {
      placementPosition.zone = 'c';
    } else if (hostX > listCenterX && hostY > listCenterY) {
      placementPosition.zone = 'a';
    }
    return placementPosition;
  }

  private _attachPreview(placement: IPreviewPosition): void {
    const componentInstance =
      this.previewOutlet.createComponent(PreviewComponent);
    componentInstance.instance.userId = this.userId;
    componentInstance.instance.position = placement;
    componentInstance.changeDetectorRef.detectChanges();
  }

  private _detachPreview(): void {
    this.previewOutlet.remove();
  }
}
