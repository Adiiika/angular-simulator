import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LoaderService } from '../loader.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  
  private loaderService = inject(LoaderService);
  constructor(private LoaderService: LoaderService) {}

  isLoading$ = this.loaderService.isLoading$.pipe(
    tap((active) => {
      document.body.style.overflow = active ? 'hidden' : 'auto';
    })
  )

  
}