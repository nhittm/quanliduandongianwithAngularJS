import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DulieuService } from '../dulieu.service';
import { INhanVien } from '../inhan-vien';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nv-them',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nv-them.component.html',
  styleUrl: './nv-them.component.css'
})
export class NvThemComponent {
   constructor(private d:DulieuService, private router:Router){}
  
   xuly(nv:INhanVien){
    this.d.themNhanVien(nv).subscribe(data=>{
      console.log(nv, data);
      alert('Them thanh cong')
      //chyen den trang danh sach nhan vien
      this.router.navigate(['/nhan_vien']);
    });
   }//xuly
}
