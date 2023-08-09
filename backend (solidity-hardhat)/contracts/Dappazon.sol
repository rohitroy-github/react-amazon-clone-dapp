// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    string public name;
    address public owner;

    // productDS
    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    // orderDS
    struct Order {
        uint256 time;
        Item item;
    }

    // productsList
    mapping(uint256 => Item) public items;

    mapping(address => uint) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    // events
    event List(string name, uint256 cost, uint256 quantity);
    event Buy(address buyer, uint256 orderId, uint256 itemId);

    constructor() {
        name = "Dappazon";
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // task -> listProducts
    // restrictedOnlyToOwners
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        // createANewProduct
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        // savingNewProductToTheProdcutList
        items[_id] = item;

        emit List(_name, _cost, _stock);
    }

    // task -> buyProducts
    function buy(uint _id) public payable {
        // fetchingTheParticularProduct
        Item memory item = items[_id];

        // checking -> enoughEtherIsSentToBuyTheItem
        require(msg.value >= item.cost);

        // checking -> enoughItemsInStock
        require(item.stock > 0);

        // createANewOrder
        Order memory order = Order(block.timestamp, item);

        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        // decrementStockBy1
        items[_id].stock = item.stock - 1;

        // emitBuyEvent
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    // task -> withdrawFunds
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
