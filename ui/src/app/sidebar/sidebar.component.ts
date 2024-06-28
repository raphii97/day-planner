import { Component } from '@angular/core';
import {TagComponent} from "../tag/tag.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TagComponent, NgForOf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  tags: Tag[] = [
    { name: 'sleep', start: 22, duration: 6, color: 'blue' },
    { name: 'work', start: 12, duration: 18, color: 'green' }
  ];
}

interface Tag {
  name: string;
  start: number;
  duration: number;
  color?: string;
}
