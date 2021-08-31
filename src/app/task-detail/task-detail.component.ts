import { Component, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

import { Input,EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit,OnChanges {
  isDisplayed:boolean
  editDisplay:boolean
  stateOfBtn:string
  disp:boolean
  showSuccess:boolean
  showError:boolean  
  imgWidthOnResize:string;
  @Input() formStatus:boolean;
  @Output() onFormHandler = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onPost = new EventEmitter<any>();
  @Output () onSelection = new EventEmitter<string>();
  @Input() task:Task  
  startingValues;
  constructor(
   
    private taskService : TasksService,
    
    ) { }

  ngOnInit(): void {
    this.isDisplayed=false; // some task is displayed
    this.editDisplay=false;  // is some task in edit mode
    this.stateOfBtn="Edit"; // innerHTML of button
    this.startingValues= this.task;   // tryng to reset value after edit mode if i hit back btn  
    this.formStatus= false; // is form displayed
    this.onResize("",window.innerWidth);
  }
  formHandler(){
    this.formStatus= !this.formStatus;

    this.onFormHandler.emit(this.formStatus);    
  }

  ngOnChanges(changes:SimpleChanges){    
    this.task._id!="" ? (this.isDisplayed=true) :this.isDisplayed=false;
    if(this.task._id!="" && this.formStatus===false && this.isDisplayed===true) this.onSelection.emit(this.task._id)
    if(this.isDisplayed){
      if(this.editDisplay===false){
        this.startingValues= this.task;              
      }
    } 
    

    

  }
  onResize(e,clientsWidthOnLoad?){
    let clientsWidth;
    if(e!=""){
      clientsWidth=e.target.innerWidth;      
    }
    else{
      clientsWidth=clientsWidthOnLoad
    }

    if(clientsWidth>800){
      this.imgWidthOnResize="20%"
    }
    else if(clientsWidth<=800 && clientsWidth>500){
      this.imgWidthOnResize="25%";
    }
    else {
      this.imgWidthOnResize="40%";
    }

  
  }
  wait(s){
    return new Promise(res=>{
      setTimeout(res,s);
    })
  }
  //http calls
  editTask(){
    
    if(this.isDisplayed){      
      if(this.editDisplay===false){
        this.editDisplay=true;
        this.disp=true;
        this.stateOfBtn="Back";
        
      }
      else {       
        this.editDisplay=false;
        this.disp=true;
        this.stateOfBtn="Edit";
      }
    }
  }
   async update(){  
    
        this.taskService.updateTask(this.task).subscribe(task=>{
        //console.log(`Task has been successfully updated to ${JSON.stringify(task)}`)   
        this.successFun()
        
        
      },
      err=>(console.error(err),(this.errorFun())));
      this.editDisplay=false;
      this.stateOfBtn="Edit";    
    
        
        
      
    }
    async successFun(){
        this.showSuccess=false;
        await this.wait(10)
        this.showSuccess=true;
        await this.wait(1000)
        this.showSuccess=false;
    }
    async errorFun(){
        this.showError=false;
        await this.wait(10)
        this.showError=true;
        await this.wait(1000)
        this.showError=false;
    }

    async removeTask  (){ 
      
      if(confirm(`Are you sure to delete task: ${this.task.task} ? `)) {
      this.isDisplayed=false;
      let id =this.task._id     
      this.taskService.removeTask(this.task._id).subscribe({
        next: err => {
            console.log(err);
            this.errorFun();
        },
        error: data => {            
            console.log(data);            
            this.successFun();

        }
    });
      this.onDelete.emit(id);        
        
              
    }
      
      
  }

  async onSubmit(form:NgForm){    
    this.formStatus=!this.formStatus;
    this.onFormHandler.emit(this.formStatus);    
    this.editDisplay=false;    
    this.taskService.addTask(form.value).subscribe(
    res=>{

      this.onPost.emit(res)
      this.successFun()         
      console.log(res)
      },

    err=>(console.log(err),this.errorFun()));
      
       
        
    
  }


}
