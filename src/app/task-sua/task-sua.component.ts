import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DulieuService } from '../dulieu.service';
import { ITask } from '../itask';
import { INhanVien } from '../inhan-vien';
import { IDuAn } from '../idu-an';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-sua',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-sua.component.html',
  styleUrl: './task-sua.component.css'
})
export class TaskSuaComponent {
  id:number = 0;
  data:ITask = <ITask>{};
  listNhanVien:INhanVien[] = [];
  listDuAn:IDuAn[] = [];
  constructor(
    private d:DulieuService,
    private route:ActivatedRoute,
    private router:Router
  ){}
  ngOnInit(): void{
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.d.lay1Task(this.id).subscribe(ta=>{
      console.log("ta=", ta);
      this.data = ta as ITask;
    });
    this.d.layNhanVien().subscribe(data =>{
      this.listNhanVien = data as INhanVien[];
    });
    this.d.layDuAn().subscribe (data =>{
      this.listDuAn = data as IDuAn[];
    });
  }//ngOnInit
  xuly(){
    this.d.suaTask(this.data).subscribe (result =>{
      console.log('result=', result);
      alert('Sửa thành công');
      //chuyen den danh sach task
      this.router.navigate(['/task']);
    });
  }
}
