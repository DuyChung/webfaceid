export default class Product {
    idname: number;
    name: string;
    catagory: string;
    idcatagory:string;
    idproduct:string;
    price:number;
    status: boolean;
    image: string
    constructor(data:any)
    {
        this.idname =data.idname ||0;
        this.name = data.name ||'';
        this.image = data.image || '';
        this.catagory=data.catagory ||'';
        this.status=data.status ||'';
        this.idcatagory=data.idcatagory ||'';
        this.idproduct=data.idproduct ||'';
        this.price=data.price ||'';
    }
}
