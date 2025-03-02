import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type taskObj = {
   task:string;
   isDone:boolean
 }

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
  public list:taskObj[]=[];
  public editIndex: number | null = null;
  public editedTask:string = '';
  public taskData : taskObj = {
    task:'',
    isDone:false
  }
 


  ngOnInit(){
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedList = localStorage.getItem('Task');
      this.list = storedList ? JSON.parse(storedList) : [];
    } else {
      console.warn('localStorage is not available.');
      this.list = [];
    }
  }
  addTask(){
    if(this.task.trim()){
      this.taskData = {
        task:this.task.trim(),
        isDone:false
      }
      this.list.push(this.taskData);
      this.task = ''
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
  saveTask(index:number){
    console.log("i am saved...")
    if(this.editedTask.trim()){
      this.list[index].task = this.editedTask.trim();
      this.editIndex = null;
      this.editedTask = '';
      this.storeTolocal();
    }
  }
  statusChange(index:number){
    this.list[index].isDone = !this.list[index].isDone;
    this.storeTolocal()
  } 

  
}
