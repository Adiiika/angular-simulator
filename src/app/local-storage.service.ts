import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    }
    catch (e) {
      console.error(`error parsing storage key ${key}`, e);
      return null;
    }
  }

  removeItem(value: string): void {
    localStorage.removeItem(value);
  }

  clearAll(): void {
    localStorage.clear();
  }

}
