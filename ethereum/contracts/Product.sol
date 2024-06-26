pragma solidity ^0.4.17;

contract ProductFactory{

    address[] public products;

    function createProduct(string product_name,string product_company,string product_manf_year,string product_manf_place, string productId) public {
        address product = new Product(msg.sender,product_name,product_company,product_manf_year,product_manf_place,productId);

        products.push(product);

    }

    function getProducts() public view returns (address[]){
        return products;
    }

    function deleteProduct(uint index) public {
        delete products[index];
    }

}

contract Product{

    address public manager;
    string public name;
    string public company;
    string public manufacture_year;
    string public manufacture_place;
    string public productId;


    function Product(address sender,string product_name,string product_company,string product_manf_year,string product_manf_place,string product_id) public {
        manager = sender;
        name = product_name;
        company = product_company;
        manufacture_year = product_manf_year;
        manufacture_place = product_manf_place;
        productId = product_id;
    }

    function getSummary() public view returns (string,string,string,string,string){

        return (name,company,manufacture_year,manufacture_place, productId);
    }

    function edit(string product_name,string product_company,string product_manf_year,string product_manf_place) public {
        require(msg.sender == manager);
        name = product_name;
        company = product_company;
        manufacture_year = product_manf_year;
        manufacture_place = product_manf_place;
    }

}