import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { CourseModel } from './crs-pln-dashboard.model';
@Component({
  selector: 'app-crs-pln-dashboard',
  templateUrl: './crs-pln-dashboard.component.html',
  styleUrls: ['./crs-pln-dashboard.component.css']
})
export class CrsPlnDashboardComponent implements OnInit {

  formValue !: FormGroup;
  crsplnModelObj : CourseModel = new CourseModel();
  crsplnData !: any;
  showAdd!: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
  private api : ApiService) { }
  
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      week :[''],
      hour :[''],
      unit :[''],
      topic :[''],
      details :[''],
      teachingMethod :[''],
      referenceMaterial :['']
    })
    this.getAllCourse();
  }
  clickAddCourse(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postCoursePlan(){
  this.crsplnModelObj.week = this.formValue.value.week;
  this.crsplnModelObj.hour = this.formValue.value.hour;
  this.crsplnModelObj.unit = this.formValue.value.unit;
  this.crsplnModelObj.topic = this.formValue.value.topic;
  this.crsplnModelObj.details = this.formValue.value.details;
  this.crsplnModelObj.teachingMethod = this.formValue.value.teachingMethod;
  this.crsplnModelObj.referenceMaterial = this.formValue.value.referenceMaterial;

  this.api.postCourse(this.crsplnModelObj)
  .subscribe(res=>{
    console.log(res);
    alert("Course Plan Added Successfuly");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllCourse();
  },
  err=>{
    alert("Something went wrong");
  })
}
getAllCourse(){
  this.api.getCourse()
    .subscribe(res=>{
      this.crsplnData = res;
    })
}
deleteCourse(row : any){
  this.api.deleteCourse(row.id)
  .subscribe(res=>{
    alert("Employee Deleted")
    this.getAllCourse();
  })
}
onEdit(row: any){
  this.showAdd = false;
  this.showUpdate = true;
  this.crsplnModelObj.id = row.id;
  this.formValue.controls['week'].setValue(row.week);
  this.formValue.controls['hour'].setValue(row.hour);
  this.formValue.controls['unit'].setValue(row.unit);
  this.formValue.controls['topic'].setValue(row.topic);
  this.formValue.controls['details'].setValue(row.details);
  this.formValue.controls['teachingMethod'].setValue(row.teachingMethod);
  this.formValue.controls['referenceMaterial'].setValue(row.referenceMaterial);
}
updateCoursePlan(){
  this.crsplnModelObj.week = this.formValue.value.week;
  this.crsplnModelObj.hour = this.formValue.value.hour;
  this.crsplnModelObj.unit = this.formValue.value.unit;
  this.crsplnModelObj.topic = this.formValue.value.topic;
  this.crsplnModelObj.details = this.formValue.value.details;
  this.crsplnModelObj.teachingMethod = this.formValue.value.teachingMethod;
  this.crsplnModelObj.referenceMaterial = this.formValue.value.referenceMaterial;

  this.api.updateCourse(this.crsplnModelObj,this.crsplnModelObj.id)
  .subscribe(res=>{
    alert("Updated Successfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllCourse();
  })
}
}
