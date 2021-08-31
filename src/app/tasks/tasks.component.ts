import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Task } from "../task";
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
 
})
export class TasksComponent implements OnInit{

  constructor(private taskService:TasksService) {
    this.taskService.getTasks().subscribe(data=>this.tasks=data,
      err=>console.log(err));   
   }
  tasks:any;
  formStatus:boolean;
  displaySingleTask:Task;
  idOfDeleted:string;
  bodyOfPosted:any
  idToFocus:string;
  ngOnInit(): void {
    

    this.displaySingleTask={
      _id:"",
      task:"",
      description:"",
      date:null
    };
    
    

  }
  
  showItem(data){
    this.displaySingleTask = this.tasks.find(e=>e._id===data);    
  }
  showFormStatus(data){
    console.log(data);
    this.formStatus= data;
  }
  deleteById(id){    
    let index = this.tasks.findIndex((e:Task)=>e._id===id);
    if(this.tasks[index+1]){
      this.displaySingleTask=this.tasks[index+1]
    }
    else if (this.tasks[index-1]){
      this.displaySingleTask=this.tasks[index-1]
    }
    else {
      this.displaySingleTask={
        _id:"",
        task:"",
        description:"",
        date:null
      };
    } 

    this.tasks.splice(index,1);    
  }
  showId(id){
    this.idToFocus=id;
  }

  postTaskToArr(body){
    this.displaySingleTask=body;
    this.tasks.unshift(body);         
  }
  

}
