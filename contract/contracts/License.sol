// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;

contract License {
    struct User {
        string name;
        string profession;
    }

    struct Vehicle {
        string brand;
        string model;
        uint year;
        uint kilometers;
        address currentOwner;
    }

    struct OwnershipHistory {
        address owner;
        uint startYear;
        uint endYear;
        uint startKilometers;
        uint endKilometers;
    }

    struct Accident {
        uint date;
        string description;
    }

    struct Maintenance {
        uint date;
        string details;
    }

    mapping(address => User) public users;
    mapping(uint => Vehicle) public vehicles;
    mapping(uint => OwnershipHistory[]) public ownershipHistories;
    mapping(uint => Accident[]) public accidentHistories;
    mapping(uint => Maintenance[]) public maintenanceHistories;

    address public authorizedDealer;

    function License() public {
        authorizedDealer = msg.sender;
    }

    modifier onlyAuthorizedDealer() {
        require(msg.sender == authorizedDealer);
        _;
    }

    function registerUser(string _name, string _profession) public {
        User memory newUser = User({name: _name, profession: _profession});
        users[msg.sender] = newUser;
    }

    function addVehicle(uint _vehicleId, string _brand, string _model, uint _year, uint _kilometers) public onlyAuthorizedDealer {
        Vehicle memory newVehicle = Vehicle({brand: _brand, model: _model, year: _year, kilometers: _kilometers, currentOwner: msg.sender});
        vehicles[_vehicleId] = newVehicle;
    }

    function transferVehicle(uint _vehicleId, address _newOwner, uint _endKilometers, uint _transferYear) public {
        require(vehicles[_vehicleId].currentOwner == msg.sender);

        OwnershipHistory memory newHistory = OwnershipHistory({owner: msg.sender, startYear: now, endYear: _transferYear, startKilometers: vehicles[_vehicleId].kilometers, endKilometers: _endKilometers});
        ownershipHistories[_vehicleId].push(newHistory);

        vehicles[_vehicleId].currentOwner = _newOwner;
        vehicles[_vehicleId].kilometers = _endKilometers;
    }

    function addAccident(uint _vehicleId, uint _date, string _description) public onlyAuthorizedDealer {
        Accident memory newAccident = Accident({date: _date, description: _description});
        accidentHistories[_vehicleId].push(newAccident);
    }

    function addMaintenance(uint _vehicleId, uint _date, string _details) public onlyAuthorizedDealer {
        Maintenance memory newMaintenance = Maintenance({date: _date, details: _details});
        maintenanceHistories[_vehicleId].push(newMaintenance);
    }

}
