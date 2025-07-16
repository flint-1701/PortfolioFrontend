import { Component, OnInit,ViewChild,ElementRef,OnDestroy } from '@angular/core';
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
    setTimeout(()=>this.getData(), 2000);
  }

  initTypedName(): void {
    const options = {
      strings: [this.InputData.FullName],
      typeSpeed: 60,
      backSpeed: 40,
      loop: false
    };

    this.typedFullName = new Typed(this.typedName.nativeElement, options);
  }

  initTypedDesc(): void {
    const options = {
      strings: [this.InputData.Description],
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

  getData() {
    this.httpClient.get<personalData>("https://localhost:7020/api/MySelf").subscribe({
      next: (responseData) => {
        this.InputData = responseData;
        this.initTypedName();
        this.initTypedDesc();
      }
    })
  }
}
