import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { SchoolService } from '../school.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { imageUrlValidator, namePersonValidator } from "../validators/image-url-validator";



@Component({
  selector: 'app-form-school',
  templateUrl: './form-school.component.html',
  styleUrls: ['./form-school.component.css']
})
export class FormSchoolComponent implements OnInit {
  schoolForm = this.fb.group({
    id: this.fb.control(null),
    name: this.fb.control('', [Validators.required]),
    logo: this.fb.control('', [Validators.required, imageUrlValidator]),
    address: this.fb.control('', [Validators.required]),
    president: this.fb.control('', [Validators.required]),
    province: this.fb.control('',[Validators.required])
  });
  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.showData();
  }

  get name(){
    return this.schoolForm.get('name')
  }

  get logo(){
    return this.schoolForm.get('logo');
  }
  get address(){
    return this.schoolForm.get('address');
  }

  get president(){
    return this.schoolForm.get('president');
  }
  get province(){
    return this.schoolForm.get('province');
  }

  showData() {
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id =>{ 
        if(id!=null){
          return this.schoolService.getSchoolsById(id)//chỗ này cần trả về một observable
        }
        else{
          return of();//chỗ này cần trả về một observable
        }
      })
    ).subscribe(data =>{
      if(data!=null){
        this.schoolForm.setValue(data);
      }
      else{
        this.schoolForm.setValue(this.schoolForm);
      }
    })
  }

  saveSchool() {
    if (this.schoolForm.value.id != null) {
      this.schoolService.editSchool(this.schoolForm.value).subscribe(data => {
        this.router.navigateByUrl('/home');
      });
    } else {
      // console.log(this.schoolForm);
      this.schoolService.addSchool(this.schoolForm.value).subscribe(data => {
        this.router.navigateByUrl('/home');
      });
    }
  }

  onSubmit(){
    
  }

  reset(){
    this.schoolForm.reset();
  }

}
