export class CartItem {

    constructor(
        public id:number,
        public name:string,
        public imageUrl:string,
        public price:number,
        public quantity:number=1


    ){}
}
