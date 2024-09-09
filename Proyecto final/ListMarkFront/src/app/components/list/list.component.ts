import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { appendFile } from 'fs';
import { List } from '../../Models/List';
import { ListService } from '../../services/list.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers:[ListService]
})
export class ListComponent {
 /* List = [
    { id: 1, name: 'Producto 1', descripcion: "Desc 1" },
    { id: 2, name: 'Producto 2', descripcion: "Desc 2" },
    { id: 3, name: 'Producto 3', descripcion: "Desc 1" },
    { id: 4, name: 'Producto 4', descripcion: "Desc 2" }
  ];*/
  
  List: List[] = [];
  newList: List = { name: '', description: '' }; // Ajustado para usar el tipo List

  constructor(private listService: ListService, private router: Router) {}

  ngOnInit(): void {
    this.loadLists();
  }

  loadLists(): void {
    this.listService.getLists().subscribe({
      next: (lists) => {
        this.List = lists;
      },
      error: (error) => console.error('Error al cargar las listas:', error)
    });
  }

  addList(): void {
    this.listService.createList(this.newList).subscribe({
      next: (list) => {
        this.List.push(list);
        this.newList = { name: '', description: '' }; // Reset form
        // Opcionalmente, cierra el modal aquí si es necesario
        window.location.reload();
      },
      error: (error) => console.error('Error al crear la lista:', error)
    });
  }

  navigateToListDetail(listId?: number): void {
    this.router.navigate(['/list-detail', listId]);
  }
}