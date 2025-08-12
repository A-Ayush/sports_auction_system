import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../basic-info/playerservice/player.service';
import { environment } from 'src/environments/environment'; // <-- Add this import

export interface Event {
  id?: number;
  type: string;
  nameOfEvent: string;
  rating: number;
  player: Player;
  // Optionally add: playerId if needed in future
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = `${environment.apiUrl}/events`; // <-- Use environment variable

  constructor(private http: HttpClient) {}

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  create(event: Event): Observable<Event> {
    console.log("event == ", event)
    return this.http.post<Event>(this.baseUrl, event);
  }

  update(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, event);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
