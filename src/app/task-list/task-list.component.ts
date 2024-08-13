import { Component } from '@angular/core';
import { ITask } from '../itask';
import { CommonModule } from '@angular/common';
import { DulieuService } from '../dulieu.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  constructor (private d:DulieuService, private router: Router){
  }
  list_task:ITask[] = [];
  ngOnInit():void{
    fetch(`http://localhost:3000/task`)
    .then(res=>res.json())
    .then(data =>{
      this.list_task = data as ITask[];
    })
  }
  suaTask(id:number):void{
    this.router.navigate(['/task/sua', id]);
  }
  xoaTask(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa task này?')) {
      this.d.xoaTask(id).subscribe(() => alert('Xóa thành công!'));

    }
    window.location.href = 'http://localhost:4200/task';
  }
}
