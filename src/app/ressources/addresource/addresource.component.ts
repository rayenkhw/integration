import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResourceService } from 'app/services/resource.service';
import { Resource } from 'app/models/resource.model';
import { FormsModule } from '@angular/forms'; 
import { Subject } from 'app/models/subject.model';
import { SubjectService } from 'app/services/subject.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ImageModel } from 'app/models/imagemodel.model';
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-add-resource',
  templateUrl: './addresource.component.html',
  styleUrls: ['./addresource.component.css']
})
export class AddResourceComponent implements OnInit {
  subjects: Subject[] = [];
  resource: Resource = new Resource();
  imageFiles: File[] = [];
  pdfFiles: File[] = [];
  userId: Number = 1;
  idSubject: number;
  filePreviews: { type: string, src: string, name: string }[] = [];
  isModalOpen = false;
  currentImage?: ImageModel;
  filteredSpecs: string[] = [];
  filteredSubjects: Subject[] = [];
  selectedGrade: number;
  selectedSpec: string;
  loggeduser: User;

  constructor(private resourceService: ResourceService, private subjectService: SubjectService, private router: Router,private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}
  
  ngOnInit(): void {
    this.loadSubjects();
    // this.userService.getLoggedUser().subscribe(user => {
    //   this.loggeduser = user;
    // });
    //this.userId = this.loggeduser.idUser;
  }

  loadSubjects(): void {
    this.subjectService.getAllSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const fileType = file.type;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (fileType.startsWith('image/')) {
            this.filePreviews.push({ type: 'image', src: e.target.result, name: file.name });
            this.imageFiles.push(file);
          } else if (fileType === 'application/pdf') {
            this.filePreviews.push({ type: 'pdf', src: e.target.result, name: file.name });
            this.pdfFiles.push(file);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
  onGradeChange(event: any) {
    this.selectedGrade = event.target.value;
    this.filterSpecsByGrade();
  }
  filterSpecsByGrade() {
    const specsSet = new Set<string>();
    this.subjects.forEach(subject => {
      if (subject.grade === +this.selectedGrade) {
        specsSet.add(subject.spec);
      }
    });
    this.filteredSpecs = Array.from(specsSet);
    this.filteredSubjects = []; // Clear subjects when grade changes
  }

  onSpecChange(event: any) {
    this.selectedSpec = event.target.value;
    this.filterSubjectsBySpec();
  }
  filterSubjectsBySpec() {
    this.filteredSubjects = this.subjects.filter(subject => subject.grade === +this.selectedGrade && subject.spec === this.selectedSpec);
  }


  onSubmit(): void {
    if (!Array.isArray(this.imageFiles) || !Array.isArray(this.pdfFiles)) {
      console.error('File arrays are not valid');
      return;
    }
    const allFiles = [...this.imageFiles, ...this.pdfFiles];
    this.resourceService.createResource(this.resource, allFiles, this.userId, this.idSubject)
      .subscribe(response => {
        console.log('Resource added successfully', response);
        //this.router.navigate(['/ressource']);
      }, error => {
        console.error('Error adding resource', error);
      });
  }

  deleteFile(index: number) {
    const fileType = this.filePreviews[index].type;
    if (fileType === 'image') {
      this.imageFiles.splice(index, 1);
    } else if (fileType === 'pdf') {
      this.pdfFiles.splice(index, 1);
    }
    this.filePreviews.splice(index, 1); // Remove the preview
  }

  openModal(resource: any) {
    this.currentImage = resource;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  getImageUrl(imageId: number): string {
    return `http://localhost:9100/library/images/${imageId}`;
  }

  getSafeUrl(imageId: number): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:9100/library/images/${imageId}`);
  }
  viewResource(image: ImageModel) {
    this.currentImage = image;
    this.isModalOpen = true;
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  
}
