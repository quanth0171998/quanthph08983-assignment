import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from '../class.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolService } from '../school.service';
import { School } from '../school';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { namePersonValidator } from '../validators/image-url-validator';

@Component({
  selector: 'app-form-class',
  templateUrl: './form-class.component.html',
  styleUrls: ['./form-class.component.css']
})
export class FormClassComponent implements OnInit {
  classForm = this.fb.group({
    id: this.fb.control(null),
    schoolId: this.fb.control('',[Validators.required]),
    name: this.fb.control('', [Validators.required]),
    roomNumber: this.fb.control('', [Validators.required]),
    totalStudent: this.fb.control('', [Validators.required]),
    mainTeacher: this.fb.control('', [Validators.required])
  })
  schools: School[];
  constructor(
    private classService:ClassService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private schoolService:SchoolService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getListSchool();
    this.showData();
  }

  get name(){
    return this.classForm.get('name');
  }
  get roomNumber(){
    return this.classForm.get('roomNumber');
  }
  get totalStudent(){
    return this.classForm.get('totalStudent');
  }
  get mainTeacher(){
    return this.classForm.get('mainTeacher');
  }
  get schoolId(){
    return this.classForm.get('schoolId');
  }

  getListSchool(){
    this.schoolService.getListSchools().subscribe(data =>{
      this.schools = data;
      // console.log(this.schools);
    })
  }
  addClass(){
    if(this.classForm.value.id!=null){
      this.classService.editClass(this.classForm.value.schoolId, this.classForm.value).subscribe(data=>{
        this.route.navigateByUrl(`/home/class-list/${this.classForm.value.schoolId}`);
      })
    }
    else{
      this.classService.addClass(this.classForm.value.schoolId, this.classForm.value).subscribe(data =>{
        this.route.navigateByUrl(`/home/class-list/${this.classForm.value.schoolId}`);
      })
    }
  }
  a=null;
  b=null;
  showData() {
    this.activatedRoute.paramMap.pipe(
      map(
        params => {
          this.a = params.get('idSchool');
          this.b = params.get('idClass');
        }
      ),
      switchMap(id => {
        if(this.a!=null&&this.b!=null){
          return this.classService.getClassById(this.a, this.b)
        }
        else{
          return of();
        }
      })
    ).subscribe(data => this.classForm.setValue(data));
  }
  
  reset(){
    this.classForm.reset();
  }
  
}
