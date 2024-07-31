import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  imports: [
    NgIf
  ],
  standalone: true
})
export class ActionModalComponent {
  @Input() isOpen: boolean = false;
  @Input() username: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() view = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  handleDelete(): void {
    this.delete.emit();
    this.closeModal();
  }

  handleView(): void {
    this.view.emit();
    this.closeModal();
  }

  handleEdit(): void {
    this.edit.emit();
    this.closeModal();
  }
}
