import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'app/services/subject.service';
import { Subject } from 'app/models/subject.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  groupedSubjects: { [key: number]: { [key: string]: Subject[] } } = {};
  selectedSubject: Subject | null = null;
  specializations: string[] = ['TRUNC', 'SAE', 'ARCTIC', 'TWIN', 'SIM'];

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getAllSubjects().subscribe(data => {
      this.subjects = data;
      this.groupSubjectsByGradeAndSpec();
    });
  }

  groupSubjectsByGradeAndSpec(): void {
    this.groupedSubjects = this.subjects.reduce((acc, subject) => {
      if (!acc[subject.grade]) {
        acc[subject.grade] = {};
      }
      if (!acc[subject.grade][subject.spec]) {
        acc[subject.grade][subject.spec] = [];
      }
      acc[subject.grade][subject.spec].push(subject);

      // Include TRUNC subjects under each specialty for grades 4 and 5
      if (subject.spec === 'TRUNC' && subject.grade > 3) {
        this.specializations.forEach(spec => {
          if (spec !== 'TRUNC' && acc[subject.grade][spec]) {
            acc[subject.grade][spec].push(subject);
          }
        });
      }

      return acc;
    }, {});
  }

  getSpecializations(grade: number): string[] {
    return grade <= 3 ? ['TRUNC'] : this.specializations;
  }

  newSubject(grade: number, spec: string): void {
    this.selectedSubject = new Subject();
    this.selectedSubject.grade = grade;
    this.selectedSubject.spec = spec;
    // Scroll to the form
  setTimeout(() => {
    const element = document.getElementById('subjectForm');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
  }

  newGeneralSubject(): void {
    this.selectedSubject = new Subject();
    // Scroll to the form
  setTimeout(() => {
    const element = document.getElementById('subjectForm');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
  }

  editSubject(subject: Subject): void {
    this.selectedSubject = { ...subject };
    // Scroll to the form
  setTimeout(() => {
    const element = document.getElementById('subjectForm');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
  }

  saveSubject(): void {
    if (this.selectedSubject) {
      if (this.selectedSubject.id_subject) {
        this.subjectService.modifySubject(this.selectedSubject).subscribe(() => this.loadSubjects());
      } else {
        if (this.selectedSubject.grade > 3 && this.selectedSubject.spec === 'TRUNC') {
          this.addTruncToAllSpecialties(this.selectedSubject);
        } else {
          this.subjectService.addSubject(this.selectedSubject).subscribe(() => this.loadSubjects());
        }
      }
      this.clearSelection();
    }
  }

  addTruncToAllSpecialties(subject: Subject): void {
    const otherSpecialties = this.specializations.filter(spec => spec !== 'TRUNC');
    otherSpecialties.forEach(spec => {
      const newSubject = { ...subject, spec } as Subject;
      this.subjectService.addSubject(newSubject).subscribe(() => this.loadSubjects());
    });
  }

  deleteSubject(id: number): void {
    this.subjectService.deleteSubject(id).subscribe(() => this.loadSubjects());
  }

  clearSelection(): void {
    this.selectedSubject = null;
  }
}
