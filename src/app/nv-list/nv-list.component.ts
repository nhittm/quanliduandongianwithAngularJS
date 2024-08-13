import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { INhanVien } from '../inhan-vien';
import { DulieuService } from '../dulieu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nv-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nv-list.component.html',
  styleUrl: './nv-list.component.css'
})
export class NvListComponent {
  constructor(private d:DulieuService, private router: Router){
    
  }
list_nhan_vien:INhanVien[] = [];
  ngOnInit():void{
    fetch(`http://localhost:3000/nhan_vien`)
    .then(res => res.json())
    .then (data =>{
      this.list_nhan_vien = data;
    })
  }
  suaNV(id:number):void{
    this.router.navigate(['/nhan_vien/sua', id]);
  }
  xoaNV(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      this.d.xoaDuAn(id).subscribe(() => alert('Xóa thành công!'));

    }
    window.location.href = 'http://localhost:4200/nhan_vien';
  }
}
