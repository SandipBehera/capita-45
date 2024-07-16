import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IpServiceService } from '../user_service/service/ip-service.service';
import { User } from '../user_service/user';
import { UserService } from '../user_service/UserService';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  public myForm: FormGroup | any;
  ipAddress: any;
  IpAddress: any = this.getIp();
  @Input() user: User = { name: '', email: '', phone: '', url: 'capital45' };
  constructor(
    private element: ElementRef,
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private ipAdd: IpServiceService,
    public router: Router
  ) {
    this.Createform();
  }

  ngOnInit(): void {}
  Createform() {
    this.myForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
  }
  getIp(): void {
    this.http
      .get('https://www.app.keyonprop.com/api/getIp')
      .subscribe((res: any) => {
        return (this.ipAddress = res.message);
      });
  }
  OnSave(): void {
    this.userService.formSubmit(this.user).subscribe(() => this.goBack());
  }
  goBack(): void {
    window.location.href = '/thankyou';
  }
}
