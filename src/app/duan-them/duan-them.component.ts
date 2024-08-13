import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DulieuService } from '../dulieu.service';
import { INhanVien } from '../inhan-vien';
import { IDuAn } from '../idu-an';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duan-them',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './duan-them.component.html',
  styleUrl: './duan-them.component.css'
})
export class DuanThemComponent {
  listNhanVien:INhanVien[]=[];
  constructor(private d:DulieuService, private router: Router){}
  ngOnInit():void{
    this.d.layNhanVien().subscribe (data =>{
      this.listNhanVien = data as INhanVien[];
    });
  }//ngOnInit
  xuly(da:IDuAn){
    this.d.themDuAn(da).subscribe(data=>{
      console.log(da, data);
      alert('Them thanh cong');
      //chuyen den danh sach du an
      this.router.navigate(['/du_an']);
    });
  }//xuly
}//class
