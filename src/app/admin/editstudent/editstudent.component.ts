import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.scss']
})
export class EditstudentComponent implements OnInit {
  id: number;
  student: any;
  form: FormGroup
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idstudent'];

    this.http.get(`http://127.0.0.1:8000/api/getoneuser/${this.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe(
      (res: any) => { this.student = res; console.log(this.student); }, err => { console.log(err); }
    );


    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      prenom: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date_n: new FormControl('', Validators.required),
      CIN: new FormControl('', Validators.required),
      CNE: new FormControl('', Validators.required)
    });
  }
  submit() {
    this.http.put(`http://127.0.0.1:8000/api/updateuser/${this.id}`, this.form.value, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/admin/students']);
      }, err => {
        console.log(err);
      }
    );

  }

}
