import { Component, inject } from '@angular/core';
import { selectDataUtility } from '../../../shared/src/lib/utilities/selectData.utility';

@Component({
  selector: 'lib-user',
  standalone: true,
  imports: [],
  templateUrl: 'user.component.html',
  styleUrl: 'user.component.scss',
})
export class UserComponent {
  ngOnInit(): void {}
}
