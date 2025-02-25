import { ReceitasComponent } from './../receitas/receitas.component';
import { Meal } from './../models/receita.model';
import { CrudService } from '../services/crud.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent{

  recipes: Observable<Meal[]>;
  erro: any;
  form = this.formBuilder.group({
    search: ''
  })
  search: '';
  isActive: boolean;

  constructor(
    private crudService: CrudService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.recipes = this.getData;
  }

  onSubmit() {
    const inputData = this.form.controls['search'].value;
    this.recipes = this.crudService.getSearchRecipe(inputData);
    this.recipes === null ? this.isActive = true: this.isActive = false;
    this.form.reset();
  }

  getData = this.crudService.getSearchRecipe();

  open(recipe: Meal): void {
    const modalRef = this.modalService.open(ReceitasComponent, { size: 'lg' });
    modalRef.componentInstance.title = recipe.title;
    modalRef.componentInstance.instructions = recipe.instructions;
    modalRef.componentInstance.linkVideo = recipe.youtube;
  }


}
