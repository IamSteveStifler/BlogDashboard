import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore,
      private toastr: ToastrService
    ) { }


  saveData(value:Category){
    this.afs.collection('categories').add(value).then(docRef => {
      console.log(docRef);

      this.toastr.success('Category Added Successfully');

    }).catch(error => console.log(error)
    )
  }

  getCategories(){
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  updateCategories(newCategory:Category, id:string){

    console.log(newCategory + " " + id);
    

    this.afs.collection('categories').doc(id).update(newCategory)
    .then(docRef => {
      this.toastr.success('Category Updated Successfully');
    })
    .catch(error => console.log(error))
  }


}
