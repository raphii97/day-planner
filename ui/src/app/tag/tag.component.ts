import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  @Input() name!: string;
  @Input() start!: number;
  @Input() duration!: number;
  @Input() color?: string;
}
