import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myProject';
  public task = '';
  public list:string[]=[];
  public editIndex: number | null = null;
  public editedTask:string = ''


  ngOnInit(){
    const storedList = localStorage.getItem('Task');
    this.list = storedList ? JSON.parse(storedList):[]
  }
  addTask(){
    if(this.task.trim()){
      this.list.push(this.task.trim());
      this.storeTolocal()
    }
  }
  removeTask(index:number){
    this.list.splice(index,1)
    this.storeTolocal()
  }
  editTask(index:number,task:string){
    this.editIndex =index;
    this.editedTask = task
  }

  storeTolocal(){
    localStorage.setItem('Task',JSON.stringify(this.list));
  }

  
}
