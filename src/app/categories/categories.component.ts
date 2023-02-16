import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) { }

  categoriesArray!:any;
  currentStatus:string = 'Add';
  categoryInput:string = '';
  categoryId:string = '';
  categoryObject!:Category;


  ngOnInit(): void {

    this.categoriesService.getCategories().subscribe( val => {
      this.categoriesArray = val;
    })

  }


  formController(categoryForm:any){

    this.categoryObject = {
      category : categoryForm.value.category
    }

    // console.log(categoryForm.value);
    if(this.currentStatus === 'Add'){
      this.categoriesService.saveData(this.categoryObject);
    }else{
      this.categoryObject.category = this.categoryInput;
      this.categoriesService.updateCategories(this.categoryObject, this.categoryId);
      this.currentStatus = 'Add';
    }

    categoryForm.reset();

  }


  editHandler(categoryName:string, id:string):void{
    console.log(categoryName);
    console.log(id);
    this.categoryInput = categoryName;
    this.currentStatus = 'Edit';
    this.categoryId = id;
  }


  deleteHandler(id:string){
    console.log(id);
    this.categoriesService.deleteCategory(id);
  }

}
