import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IDuAn } from '../idu-an';
import { DulieuService } from '../dulieu.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-duan-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './duan-list.component.html',
  styleUrl: './duan-list.component.css'
})
export class DuanListComponent {
  list_du_an:IDuAn[]= [];
  constructor (private d:DulieuService, private router: Router){

  }
  ngOnInit():void {
    fetch(`http://localhost:3000/du_an`)
    .then (res => res.json())
    .then (data =>{
      this.list_du_an = data;
    })
  }
  suaDA(id:number):void{
    this.router.navigate(['/du_an/sua', id]);
  }
  xoaDA(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      this.d.xoaDuAn(id).subscribe(() => alert('Xóa thành công!'));

    }
    window.location.href = 'http://localhost:4200/du_an';
  }
}
