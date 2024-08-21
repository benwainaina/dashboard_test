import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  IPreviewPosition,
  TPreviewPlacement,
} from '../../../state_manager/interfaces';
import { renderer2Utility } from '../../../utilities/renderer2.utility';
import { Observable } from 'rxjs';
import { IUserData } from '../../../../../../user/src/state_manager/interfaces';
import { selectDataUtility } from '../../../utilities/selectData.utility';
import { selectPreviewUserData } from '../../../../../../user/src/state_manager/selectors';
import { AsyncPipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-preview-component',
  standalone: true,
  imports: [NgStyle, AsyncPipe],
  templateUrl: './preview-component.component.html',
  styleUrl: './preview-component.component.scss',
})
export class PreviewComponentComponent implements AfterViewInit, OnInit {
  @Input({ required: true }) public userId!: string;
  @Input({ required: true }) public position!: IPreviewPosition;
  @ViewChild('outlet', { static: true })
  private _outlet!: ElementRef<HTMLDivElement>;
  @ViewChild('contentElementRef', { static: true })
  private _contentElementRef!: ElementRef<HTMLDivElement>;
  private _renderer2Utility = renderer2Utility();
  private _selectDataUtility = selectDataUtility();
  public userData$!: Observable<IUserData>;

  constructor() {}

  ngOnInit(): void {
    this.userData$ = this._selectDataUtility(selectPreviewUserData, {
      userId: this.userId,
    });
  }

  ngAfterViewInit(): void {
    this._pickPlacementPosition();
    this._placeContentElement();
  }

  private _pickPlacementPosition(): void {
    const {
      zone,
      hostCenterX: cardCenterX,
      hostCenterY: cardCenterY,
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

  private _placeContentElement(): void {
    const { height } =
      this._contentElementRef.nativeElement.getBoundingClientRect();
    this._renderer2Utility(
      this._contentElementRef.nativeElement,
      'top',
      `${(height / 2) * -1}px`
    );
  }
}
