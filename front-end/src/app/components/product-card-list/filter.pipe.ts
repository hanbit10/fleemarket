import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/product';
const { isArray } = Array;

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], find: string): Product[] {
    if(!products) return [];
    if(!find) return products;
    find = find.toLowerCase();
    return search(products, find);
  }
}

function search(all: any[], search: string): Product[] {
  search = search.toLowerCase();
  return all.filter(function (obj) {
    const keys: string[] = Object.keys(obj);
    return keys.some(function (key) {
      const value = obj[key];
      if (isArray(value)) {
        return value.some(v => {
          return v.toLowerCase().includes(search);
        });
      }
      else if (!isArray(value)) {
        return value.toLowerCase().includes(search);
      }
    })
  });

}
