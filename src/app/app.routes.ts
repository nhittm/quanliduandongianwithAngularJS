import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DuanListComponent } from './duan-list/duan-list.component';
import { DuanThemComponent } from './duan-them/duan-them.component';
import { DuanSuaComponent } from './duan-sua/duan-sua.component';
import { NvListComponent } from './nv-list/nv-list.component';
import { NvThemComponent } from './nv-them/nv-them.component';
import { NvSuaComponent } from './nv-sua/nv-sua.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskThemComponent } from './task-them/task-them.component';
import { TaskSuaComponent } from './task-sua/task-sua.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'du_an', component: DuanListComponent, title:'Danh Sach Du An'},
    { path: 'du_an/them', component: DuanThemComponent, title:'Them Du An'},
    { path: 'du_an/sua/:id', component: DuanSuaComponent, title:'Sua Du An'},
    { path: 'nhan_vien', component: NvListComponent, title:'Danh Sach Nhan Vien'},
    { path: 'nhan_vien/them', component: NvThemComponent, title:'Them Nhan Vien'},
    { path: 'nhan_vien/sua/:id', component: NvSuaComponent, title:'Sua Nhan Vien'},
    { path: 'task', component: TaskListComponent, title: 'Danh Sach Task'},
    { path: 'task/them', component: TaskThemComponent, title: 'Them Task'},
    { path: 'task/sua/:id', component: TaskSuaComponent, title: 'Sua Task'},
    { path: '**', component: NotFoundComponent, title: 'Page Not Found' }

];
