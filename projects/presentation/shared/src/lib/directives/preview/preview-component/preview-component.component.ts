import { Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'app-preview-component',
  standalone: true,
  imports: [],
  templateUrl: './preview-component.component.html',
  styleUrl: './preview-component.component.scss',
})
export class PreviewComponentComponent {
  @Input({ required: true }) public userId!: string;
  @Input({ required: true }) public position!: {
    hostX: number;
    hostY: number;
    hostCenterX: number;
    hostCenterY: number;
    zone: 'a' | 'b' | 'c' | 'd';
  };

  private _hostElement: ElementRef<HTMLDivElement> = inject(ElementRef);

  ngOnInit(): void {
    console.log('userid', this.userId);
    console.log('_position', this.position);
    console.log('_hostElement', this._hostElement.nativeElement);
  }
}
