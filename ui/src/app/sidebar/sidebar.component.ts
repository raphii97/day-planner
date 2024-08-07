import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {TagComponent} from "../tag/tag.component";
import {NgForOf} from "@angular/common";

interface Tag{
  name:string;
  start:number;
  duration:number;
  color:string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TagComponent, NgForOf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Output() tagsChange = new EventEmitter<Tag[]>();

  tags: Tag[] = [
    {name:'sleep',start:23,duration:8,color:'pink'},
    {name:'work',start:9,duration:8,color:'violet'},
    {name:'lunch',start:12,duration:1,color:'yellow'},
    {name:'freetime',start:17,duration:6,color:'#add8e6'},
    {name:'workout',start:7,duration:2,color:'#55efc4'}
  ];

  ngOnInit() {
    this.emitTags();
  }

  emitTags() {
    this.tagsChange.emit(this.tags);
  }

  editTag(index:number){
    const newName=prompt('Enter new name',this.tags[index].name);
    const newStart=prompt('Enter new start time',this.tags[index].start.toString());
    const newDuration=prompt('Enter new duration',this.tags[index].duration.toString());
    const newColor=prompt('Enter new color',this.tags[index].color);

    if(newName && newStart && newDuration && newColor){
      this.tags[index]={
        name:newName,
        start:+newStart,
        duration:+newDuration,
        color:newColor
      };

      this.emitTags();
    }
  }

  deleteTag(index:number){
    this.tags.splice(index,1);
    this.emitTags();
  }

  addTag() {
    const newName=prompt('Enter tag name');
    const newStart=prompt('Enter start time');
    const newDuration=prompt('Enter duration');
    const newColor=prompt('Enter color');

    if (newName && newStart && newDuration && newColor){
      this.tags.push({
        name:newName,
        start:+newStart,
        duration:+newDuration,
        color:newColor
      });
    }

    this.emitTags();
  }
}
