import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Player {
  id?: number;
  name: string;
  empId: string;
  department: string;
  photoFilename?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = 'http://localhost:8081/api/players';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl);
  }

  getById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/${id}`);
  }

  create(player: Partial<Player>, photo?: File): Observable<Player> {
    const formData = new FormData();
    formData.append('name', player.name || '');
    formData.append('empId', player.empId || '');
    formData.append('department', player.department || '');
    if (photo) {
      formData.append('photo', photo, photo.name);
    }
    return this.http.post<Player>(this.baseUrl, formData);
  }

  update(id: number, changes: Partial<Player>): Observable<Player> {
    return this.http.put<Player>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getPhoto(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/photo`, { responseType: 'blob' });
  }
}
