import { Component, Input } from '@angular/core';

@Component({
  selector: 'sb-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input()
  public url!: string;
}
