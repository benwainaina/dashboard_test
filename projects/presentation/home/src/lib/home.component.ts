import { Component } from '@angular/core';
import { PagesComponentComponent } from '../../../shared/src/lib/components/pages-component/pages-component.component';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [PagesComponentComponent],
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
})
export class HomeComponent {}
