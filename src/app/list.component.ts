import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-list',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
  })
export class ListComponent {
  users = JSON.parse(localStorage.getItem('users') || '[]');

  navigateToDetails(userId: number) {
    window.location.href = `/details/${userId}`;
  }
}