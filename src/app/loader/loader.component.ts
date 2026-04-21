import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LoaderService } from '../loader.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  private loaderService: LoaderService = inject(LoaderService);

  isLoading$: Observable<boolean> = this.loaderService.isLoading$.pipe(
    tap((active: boolean) => {
      document.body.style.overflow = active ? 'hidden' : 'auto';
    })
  )

}