import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import {
  IPreviewPosition,
  TPreviewPlacement,
} from '../../../state_manager/interfaces';
import { renderer2Utility } from '../../../utilities/renderer2.utility';

@Component({
  selector: 'app-preview-component',
  standalone: true,
  imports: [],
  templateUrl: './preview-component.component.html',
  styleUrl: './preview-component.component.scss',
})
export class PreviewComponentComponent implements AfterViewInit {
  @Input({ required: true }) public userId!: string;
  @Input({ required: true }) public position!: IPreviewPosition;
  @ViewChild('outlet', { static: true })
  private _outlet!: ElementRef<HTMLDivElement>;

  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _renderer2Utility = renderer2Utility();
  private _hostElement: ElementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    this._changeDetectorRef.detectChanges();
    this._pickPlacementPosition();
  }

  private _pickPlacementPosition(): void {
    const {
      zone,
      hostCenterX: cardCenterX,
      hostCenterY: cardCenterY,
      hostX: cardStartX,
      hostY: cardStartY,
    } = this.position;

    switch (zone) {
      case 'a':
        return this._placeInZoneA(cardCenterX, cardCenterY);
      case 'b':
        return this._placeInZoneB(cardCenterX, cardCenterY);
      case 'c':
        return this._placeInZoneC(cardCenterX, cardCenterY);
      case 'd':
        return this._placeInZoneD(cardCenterX, cardCenterY);
    }
  }

  private _placeInZoneA(cardCenterX: number, cardCenterY: number): void {
    const { height: hostHeight, width: hostWidth } =
      this._getHostElementDomRect();
    this._renderer2Utility(
      this._outlet.nativeElement,
      'left',
      `${cardCenterX - hostWidth}px`
    );
    this._renderer2Utility(
      this._outlet.nativeElement,
      'top',
      `${cardCenterY - hostHeight}px`
    );
  }

  private _placeInZoneB(cardCenterX: number, cardCenterY: number): void {
    const { height: hostHeight, width: hostWidth } =
      this._getHostElementDomRect();
    this._renderer2Utility(
      this._outlet.nativeElement,
      'left',
      `${cardCenterX}px`
    );
    this._renderer2Utility(
      this._outlet.nativeElement,
      'top',
      `${cardCenterY - hostHeight}px`
    );
  }

  private _placeInZoneC(cardCenterX: number, cardCenterY: number): void {
    const { height: hostHeight, width: hostWidth } =
      this._getHostElementDomRect();
    this._renderer2Utility(
      this._outlet.nativeElement,
      'left',
      `${cardCenterX - hostWidth}px`
    );
    this._renderer2Utility(
      this._outlet.nativeElement,
      'top',
      `${cardCenterY}px`
    );
  }

  private _placeInZoneD(cardCenterX: number, cardCenterY: number): void {
    const { height: hostHeight, width: hostWidth } =
      this._getHostElementDomRect();
    this._renderer2Utility(
      this._outlet.nativeElement,
      'left',
      `${cardCenterX}px`
    );
    this._renderer2Utility(
      this._outlet.nativeElement,
      'top',
      `${cardCenterY}px`
    );
  }

  private _getHostElementDomRect(): DOMRect {
    return this._outlet.nativeElement.getBoundingClientRect() || {};
  }
}
