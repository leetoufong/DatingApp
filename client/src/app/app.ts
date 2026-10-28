import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private API = 'https://localhost:5001/api/members';
  private http = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members = signal<any>([]);

  // Cleaner version
  ngOnInit(): void {
    this.http.get(this.API).subscribe({
      next: response => this.members.set(response),
      error: error => console.log(error),
      complete: () => console.log('Completed the http request')
    });
  }

  // Not so clean but works
  // async ngOnInit() {
  //   this.members.set(await this.getMembers())
  // }

  // async getMembers() {
  //   try {
  //     return lastValueFrom(this.http.get(this.API));
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
}
