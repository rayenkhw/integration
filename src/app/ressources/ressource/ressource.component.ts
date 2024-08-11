// src/app/components/ressource/ressource.component.ts

import { Component, OnInit } from '@angular/core';
import { ImageModel } from 'app/models/imagemodel.model';
import { Resource } from 'app/models/resource.model';
import { ResourceService } from 'app/services/resource.service';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {
  resources: Resource[] = [];
  filteredResources: Resource[] = [];
  specialties: string[] = [];
  statuses: string[] = [];
  subjects: string[] = [];
  isModalOpen: boolean = false;
  currentImage?: ImageModel;

  filters = {
    specialty: '',
    status: '',
    subject: ''
  };

  constructor(
    private resourceService: ResourceService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources() {
    this.resourceService.retrieveAllResources().subscribe(data => {
      this.resources = data;
      this.filteredResources = data;
      this.populateFilters();
    });
  }

  populateFilters() {
    this.specialties = [...new Set(this.resources.map(resource => resource.subject.spec))];
    this.statuses = [...new Set(this.resources.map(resource => resource.status))];
    this.subjects = [...new Set(this.resources.map(resource => resource.subject.name))];
  }

  applyFilters() {
    this.filteredResources = this.resources.filter(resource => {
      return (!this.filters.specialty || resource.subject.spec === this.filters.specialty) &&
             (!this.filters.status || resource.status === this.filters.status) &&
             (!this.filters.subject || resource.subject.name === this.filters.subject);
    });
  }

  getImageUrl(imageId: number): string {
    return `http://localhost:9100/library/images/${imageId}`;
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
