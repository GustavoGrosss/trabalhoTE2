import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    // Salva um item no localStorage
    setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Obtém um item do localStorage
    getItem(key: string): any {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    // Remove um item do localStorage
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    // Limpa todos os itens do localStorage
    clear(): void {
        localStorage.clear();
    }
}
