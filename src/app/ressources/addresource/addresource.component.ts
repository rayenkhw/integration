import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResourceService } from 'app/services/resource.service';
import { Resource } from 'app/models/resource.model';
import { FormsModule } from '@angular/forms'; 
import { Subject } from 'app/models/subject.model';
import { SubjectService } from 'app/services/subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resource',
  templateUrl: './addresource.component.html',
  styleUrls: ['./addresource.component.css']
})
export class AddResourceComponent implements OnInit {
  subjects: Subject[] = [];
  resource: Resource = new Resource();
  imageFiles: File[] = [];
  userId: number = 1;
  idSubject: number;

  constructor(private resourceService: ResourceService,private subjectService: SubjectService, private router: Router) {}
  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getAllSubjects().subscribe(data => {
      this.subjects = data;
      
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFiles = Array.from(event.target.files);
    } else {
      this.imageFiles = [];
    }
  }
  

  onSubmit(): void {
    if (!Array.isArray(this.imageFiles)) {
      console.error('imageFiles is not an array');
      return;
    }
    this.resourceService.createResource(this.resource, this.imageFiles, this.userId, this.idSubject)
      .subscribe(response => {
        console.log('Resource added successfully', response);
        //this.router.navigate(['/ressource']);
      }, error => {
        console.error('Error adding resource', error);
      });

  }
}
