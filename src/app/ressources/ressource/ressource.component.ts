
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ImageModel } from 'app/models/imagemodel.model';
import { Resource } from 'app/models/resource.model';
import { User } from 'app/models/user.model';
import { ResourceService } from 'app/services/resource.service';
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {
  resources: Resource[] = [];
  filteredResources: Resource[] = [];
  specialties: string[] = [];
  filteredSpecialties: string[] = [];
  statuses: string[] = [];
  subjects: string[] = [];
  grades: number[] = [];
  isModalOpen: boolean = false;
  currentImage?: ImageModel;
  staticUser: User; // This will be set after fetching from the database

  filters = {
    grade: '',

    specialty: '',
    status: '',
    subject: ''
  };

  constructor(
    private resourceService: ResourceService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient,
    private userService: UserService // Inject the UserService

  ) { }

  ngOnInit(): void {
    this.loadResources();
    this.loadStaticUser();
  }

  loadStaticUser(): void {
    this.userService.getUserById(1).subscribe(user => {
      this.staticUser = user;
    }, error => {
      console.error('Error fetching user', error);
    });

  }

  loadResources() {
    this.resourceService.retrieveAllResources().subscribe(data => {
      this.resources = data;
      this.filteredResources = data;
      this.populateFilters();
      this.applyFilters();

    });
  }

  populateFilters() {
    this.grades = [...new Set(this.resources.map(resource => resource.subject.grade))];
    this.statuses = [...new Set(this.resources.map(resource => resource.status))];
    this.subjects = [...new Set(this.resources.map(resource => resource.subject.name))];
    this.specialties = [...new Set(this.resources.map(resource => resource.subject.spec))];
  }

  applyFilters() {
    const grade = parseInt(this.filters.grade, 10);
    if (grade === 1 || grade === 2 || grade === 3) {
      this.filteredSpecialties = ['TRUNC'];
    } else {
      this.filteredSpecialties = this.specialties;
    }

    this.filteredResources = this.resources.filter(resource => {
      return (!this.filters.grade || resource.subject.grade === grade) &&
             (!this.filters.specialty || resource.subject.spec === this.filters.specialty) &&

             (!this.filters.status || resource.status === this.filters.status) &&
             (!this.filters.subject || resource.subject.name === this.filters.subject);
    });
  }

  getImageUrl(imageId: number): string {
    return `http://localhost:9100/library/images/${imageId}`;
  }

  getSafeUrl(imageId: number): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:9100/library/images/${imageId}`);
  }
  

  approveResource(resourceId: number): void {
    const resource = this.resources.find(r => r.id_resource === resourceId);
    if (resource) {
      resource.status = 'APPROVED';
      resource.approve = this.staticUser; // Set the static user
      this.resourceService.modifyResource(resource).subscribe(
        () => {
          this.applyFilters();
          console.log(`Approved resource with ID: ${resourceId}`);
        },
        error => {
          console.error('Error approving resource', error);
        }
      );
    }
  }
  
  declineResource(resourceId: number): void {
    const resource = this.resources.find(r => r.id_resource === resourceId);
    if (resource) {
      this.resourceService.removeResource(resourceId).subscribe(
        () => {
          this.resources = this.resources.filter(r => r.id_resource !== resourceId);
          this.applyFilters();
          console.log(`Deleted resource with ID: ${resourceId}`);
        },
        error => {
          console.error('Error deleting resource', error);
        }
      );
    }
  }

  
  

  viewResource(resource: Resource): void {
    if (resource.resourceImages.length > 0) {
      this.currentImage = resource.resourceImages[0]; // Display the first image as a default
      this.isModalOpen = true;
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}