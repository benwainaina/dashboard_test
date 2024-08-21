import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { PreviewComponentComponent } from './preview-component/preview-component.component';

@Directive({
  selector: '[previewDirective]',
  standalone: true,
})
export class PreviewDirective implements OnInit {
  private _hostElement: ElementRef<HTMLDivElement> = inject(ElementRef);
  private _viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

  @Input({ required: true }) public userId!: string;
  @Input({ required: true }) public previewOutlet!: any;

  ngOnInit(): void {
    this._listenForHoverOnHost();
  }

  private _listenForHoverOnHost(): void {
    this._hostElement.nativeElement.addEventListener('mouseenter', (ev) =>
      this._attachPreview()
    );

    this._hostElement.nativeElement.addEventListener('mouseleave', (ev) =>
      this._detachPreview()
    );
  }

  private _attachPreview(): void {
    const componentInstance = this.previewOutlet.createComponent(
      PreviewComponentComponent
    );
    componentInstance.instance.userId = this.userId;
    componentInstance.changeDetectorRef.detectChanges();
  }

  private _detachPreview(): void {
    this.previewOutlet.remove();
  }
}
