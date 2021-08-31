import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Task } from '../task';
import { TasksComponent } from '../tasks/tasks.component';
import { Output, EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  inputs: ["tasks"]
})
export class TaskListComponent implements OnInit,OnChanges {
  @Input() formStatus:boolean;
  @Output() onFormHandler = new EventEmitter<boolean>();  
  @Output() onItemSelected = new EventEmitter<string>();  
  @Input() tasks; 
  @Input() idToFocus:string;
  constructor() {
    
  }
 
  ngOnInit(): void {    
    this.formStatus=false;

  }
  
  ngOnChanges (changes:SimpleChanges) {  
    try{
      this.selectTask(changes['idToFocus'].currentValue)}
    catch(ex){
      // no idea why on post it says it cant read currentValue of undefinied
      //maybe data are not here bcs data are loade on ngOnInit but ngOnChanges load before this cyclehook
      //.... need some kind of promise to wait until ngOnInit from other comp
      // is finished and then ngOnChanges is available.
    }
    
    
    //this.selectTask(focusedId);
   
  }

  showId(id:string){
    if(this.formStatus===false){
      this.onItemSelected.emit(id);
    }
    else {
      this.formHandler()
      this.onItemSelected.emit(id);
      
    }
      
    
    
    
  }
  selectTask(id):void{
    this.tasks.forEach(element => {
      element.selected=false;
    });
    this.tasks.find(e=>e._id===id).selected=true;
  }
  
  
  formHandler(){
    this.formStatus= !this.formStatus;
    this.onFormHandler.emit(this.formStatus);    
  }

}

