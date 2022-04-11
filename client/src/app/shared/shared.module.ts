import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule],
  exports: [MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule],
})

export class SharedModule { }
