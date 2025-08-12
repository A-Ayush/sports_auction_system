import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Player {
  id?: number;
  name: string;
  empId: string;
  department: string;
  photoFilename?: string;
  photoFile?: File | null;

  // New Jersey details
  jerseyName?: string | null;
  gender?: string;
  jerseyNumber?: number | null;
  size?: string;

  // Role selection
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = `${environment.apiUrl}/players`; // <-- Use environment variable

  constructor(private http: HttpClient) {}

  private playerData: Player | null = null;

  setPlayer(player: Player): void {
    this.playerData = player;
  }

  getPlayer(): Player | null {
    return this.playerData;
  }

  clearPlayer(): void {
    this.playerData = null;
  }

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

    // New jersey details
    formData.append('jerseyName', player.jerseyName || '');
    formData.append('gender', player.gender || '');
    formData.append('jerseyNumber', player.jerseyNumber != null ? player.jerseyNumber.toString() : '');
    formData.append('size', player.size || '');

    // Role
    formData.append('role', player.role || '');

    if (photo) {
      formData.append('photo', photo, photo.name);
    }

    console.log(formData);
    console.log([... (formData as any).entries()]);

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

  login(empId: string, name: string): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/login?empId=${empId}&name=${name}`);
  }

  setLoggedInPlayer(player: Player) {
    localStorage.setItem('loggedInPlayer', JSON.stringify(player));
  }

  getLoggedInPlayer(): Player | null {
    const data = localStorage.getItem('loggedInPlayer');
    return data ? JSON.parse(data) : null;
  }

  hasSelectedEvents(playerId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${playerId}/hasSelectedEvents`);
  }
}
