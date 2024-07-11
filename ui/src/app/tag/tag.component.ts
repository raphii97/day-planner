import {Component, EventEmitter, Input, Output} from '@angular/core';

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
  @Input() color!: string;

  @Output()edit= new EventEmitter<void>();
  @Output()delete= new EventEmitter<void>();

  onEdit():void{
    this.edit.emit();
  }

  onDelete():void{
    this.delete.emit();
  }
}
