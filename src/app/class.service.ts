import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Class } from './class';

const  url = "https://5e85ff7344467600161c6c13.mockapi.io/schools";
@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private http: HttpClient
  ) { }

  getListClass(id): Observable<Class[]>{
    return this.http.get<Class[]>(`${url}/${id}/classes`);
  }

  getClassById(idSchool, idClass): Observable<Class>{
    return this.http.get<Class>(`${url}/${idSchool}/classes/${idClass}`);
  }
  
  addClass(idSchool, classObj): Observable<Class>{
    return this.http.post<Class>(`${url}/${idSchool}/classes`, classObj);
  }
  deleteClass(idSchool, idClass): Observable<Class>{
    return this.http.delete<Class>(`${url}/${idSchool}/classes/${idClass}`);
  }
  editClass(idSchool, classObj): Observable<Class>{
    return this.http.put<Class>(`${url}/${idSchool}/classes/${classObj.id}`, classObj);
  }
  
}
