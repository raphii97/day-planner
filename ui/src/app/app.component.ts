import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {CanvasComponent} from "./canvas/canvas.component";

interface Tag{
  name:string;
  start:number;
  duration:number;
  color:string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ui';

  data:Tag[]=[];

  onDataChange(tags:Tag[]):void{
    this.data=tags.slice();
  }
}
