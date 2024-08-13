import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DulieuService } from '../dulieu.service';
import { ITask } from '../itask';
import { INhanVien } from '../inhan-vien';
import { IDuAn } from '../idu-an';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-them',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-them.component.html',
  styleUrl: './task-them.component.css'
})
export class TaskThemComponent {
  listNhanVien:INhanVien[]=[];
  listDuAn:IDuAn[]=[];
  constructor(private d:DulieuService, private router: Router){}
  ngOnInit(): void{
    this.d.layNhanVien().subscribe (data =>{
      this.listNhanVien = data as INhanVien[];
    });
    this.d.layDuAn().subscribe (data =>{
      this.listDuAn = data as IDuAn[];
    });
  }//ngOnInit
  xuly(ta:ITask){
    this.d.themTask(ta). subscribe(result =>{
      console.log(ta, result,);
      alert('Them thanh cong')
      //chuyen den danh sach task
      this.router.navigate(['/task']);
    })
  }
}
