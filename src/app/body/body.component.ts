import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { personalData } from './personalData.model';
import { HttpClient } from '@angular/common/http';
import Typed from 'typed.js';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {

  @ViewChild('typedName', { static: true }) typedName!: ElementRef;
  @ViewChild('typedDesc', { static: true }) typedDesc!: ElementRef;
  constructor(private httpClient: HttpClient) {

  }
  InputData!: personalData;
  typedFullName?: Typed;
  typedDescription?: Typed;

  ngOnInit() {
    this.initTypedName();
    this.initTypedDesc();
  }

  initTypedName(): void {
    const options = {
      strings: ["Akshay Birari"],
      typeSpeed: 60,
      backSpeed: 40,
      loop: false
    };

    this.typedFullName = new Typed(this.typedName.nativeElement, options);
  }

  initTypedDesc(): void {
    const options = {
      strings: [`Full Stack Developer with 3+ years of experience in building enterprise-grade web applications using C#, .NET, 
Angular, SQL, and MongoDB. Skilled in optimizing performance, scalable architecture, and clean code practices. 
Proficient in Data Structures, Algorithms, and System Design, with a focus on solving complex engineering 
challenges and contributing to growth-oriented teams.`],
      typeSpeed: 10,
      backSpeed: 120,
      loop: false
    };

    this.typedDescription = new Typed(this.typedDesc.nativeElement, options);
  }

  ngOnDestroy(): void {
    this.typedFullName?.destroy();
    this.typedDescription?.destroy();// Cleanup
  }
}
