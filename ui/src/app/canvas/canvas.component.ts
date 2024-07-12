import {AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';

interface Tag{
  name:string;
  start:number;
  duration:number;
  color:string;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  standalone: true,
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() plan: Tag[] = [];

  private ctx!: CanvasRenderingContext2D;

  private circle: any = {
    unit: (2 * Math.PI) / 24
  };

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.circleInit();
    window.addEventListener('resize', () => this.circleInit());
  }

  ngOnChanges(): void {
    this.drawCircle();
  }

  private circleInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const h = canvas.height = window.innerHeight;
    const w = canvas.width = window.innerWidth;

    this.circle.x = w / 2;
    this.circle.y = h / 2;
    this.circle.radius = Math.min(h, w) / 3;

    this.drawCircle();
  }

  private drawCircle(): void {
    const ctx = this.ctx;
    const circle = this.circle;

    ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    // outline
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.arc(circle.x, circle.y, circle.radius / 2, 0, 2 * Math.PI);
    ctx.lineWidth = 0.1;
    ctx.stroke();

    // events
    for (const event of this.plan) {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, circle.unit * event.start, circle.unit * (event.duration + event.start));
      ctx.lineTo(circle.x, circle.y);
      ctx.closePath();

      ctx.fillStyle = event.color;
      ctx.fill();
    }

    // middle empty space
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius / 2, 0, 2 * Math.PI);
    ctx.closePath();

    ctx.fillStyle = '#fff'; // bg color
    ctx.fill();

    //timer
    this.timer()
  }

  private timer(): void {
    const ctx = this.ctx;
    const circle = this.circle;
    const d = new Date();
    const rad = (d.getHours() + d.getMinutes() / 60) * circle.unit;

    ctx.beginPath();
    ctx.arc(
      Math.cos(rad) * (circle.radius + 20) + circle.x,
      Math.sin(rad) * (circle.radius + 20) + circle.y,
      circle.radius / 50, 0, 2 * Math.PI
    );
    ctx.closePath();

    ctx.fillStyle = '#222';
    ctx.fill();
  }
}
