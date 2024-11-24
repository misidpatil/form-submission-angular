import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  user: any;
  userId!: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.userId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.user = users[this.userId];
  }

  edit(): void {
    this.router.navigate(['/create'], { queryParams: { id: this.userId } });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}