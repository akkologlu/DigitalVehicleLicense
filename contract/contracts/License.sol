// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract License {


    struct Vehicle {
        string brand;
        string model;
        uint year;
        uint kilometers;
        address currentOwner;
    }

    struct Ownership {
        uint id;
        string name;
        string profession;
        uint startYear;
        uint endYear;
        uint startKilometers;
        uint endKilometers;
    }

    struct Accident {
        uint id;
        uint date;
        string description;
    }

    struct Maintenance {
        uint id;
        uint date;
        string report;
    }

    enum PartStatusType { Original, Changed, Painted }

    struct BumperStatus {
        PartStatusType frontBumper;
        PartStatusType rearBumper;
    }

    struct HoodStatus {
        PartStatusType frontHood;
        PartStatusType rearHood;
    }

    struct FenderStatus {
        PartStatusType rightFrontFender;
        PartStatusType leftFrontFender;
        PartStatusType rightRearFender;
        PartStatusType leftRearFender;
    }

    struct DoorStatus {
        PartStatusType rightFrontDoor;
        PartStatusType leftFrontDoor;
        PartStatusType rightRearDoor;
        PartStatusType leftRearDoor;
    }

    struct PartStatus {
        BumperStatus bumpers;
        HoodStatus hoods;
        PartStatusType roof;
        FenderStatus fenders;
        DoorStatus doors;
    }

    mapping(string => Vehicle) public vehicles;
    mapping(string => mapping(uint => Accident)) public accidentHistories;
    mapping(string => mapping(uint => Ownership)) public ownershipHistories;
    mapping(string => mapping(uint => Maintenance)) public maintenanceHistories;
    mapping(string => uint) public accidentCounts;
    mapping(string => uint) public maintenanceCounts;
    mapping(string => uint) public ownershipCounts;
    mapping(string => PartStatus) public partStatuses;

    address public authorizedDealer;

    constructor() {
        authorizedDealer = msg.sender;
    }

    modifier onlyAuthorizedDealer() {
        require(msg.sender == authorizedDealer, "Only authorized dealer can perform this action");
        _;
    }


    function addVehicle(string memory _vehicleId, string memory _brand, string memory _model, uint _year, uint _kilometers) public  {
        Vehicle memory newVehicle = Vehicle({
            brand: _brand,
            model: _model,
            year: _year,
            kilometers: _kilometers,
            currentOwner: msg.sender
        });
        vehicles[_vehicleId] = newVehicle;

        BumperStatus memory defaultBumperStatus = BumperStatus({
            frontBumper: PartStatusType.Original,
            rearBumper: PartStatusType.Original
        });

        HoodStatus memory defaultHoodStatus = HoodStatus({
            frontHood: PartStatusType.Original,
            rearHood: PartStatusType.Original
        });

        FenderStatus memory defaultFenderStatus = FenderStatus({
            rightFrontFender: PartStatusType.Original,
            leftFrontFender: PartStatusType.Original,
            rightRearFender: PartStatusType.Original,
            leftRearFender: PartStatusType.Original
        });

        DoorStatus memory defaultDoorStatus = DoorStatus({
            rightFrontDoor: PartStatusType.Original,
            leftFrontDoor: PartStatusType.Original,
            rightRearDoor: PartStatusType.Original,
            leftRearDoor: PartStatusType.Original
        });

        PartStatus memory defaultPartStatus = PartStatus({
            bumpers: defaultBumperStatus,
            hoods: defaultHoodStatus,
            roof: PartStatusType.Original,
            fenders: defaultFenderStatus,
            doors: defaultDoorStatus
        });

        partStatuses[_vehicleId] = defaultPartStatus;
    }


    function addAccident(string memory _vehicleId, uint _date, string memory _description) public  {
        uint accidentId = accidentCounts[_vehicleId]++;
        Accident memory newAccident = Accident({id: accidentId, date: _date, description: _description});
        accidentHistories[_vehicleId][accidentId] = newAccident;
    }

    function getAccident(string memory _vehicleId, uint _accidentId) public view returns (Accident memory) {
        require(_accidentId < accidentCounts[_vehicleId], "Accident does not exist");
        return accidentHistories[_vehicleId][_accidentId];
    }

    function getAccidentHistory(string memory _vehicleId) public view returns (Accident[] memory) {
        uint accidentCount = accidentCounts[_vehicleId];
        Accident[] memory accidents = new Accident[](accidentCount);

        for (uint i = 0; i < accidentCount; i++) {
            accidents[i] = accidentHistories[_vehicleId][i];
        }

        return accidents;
    }

    function addMaintenance(string memory _vehicleId, uint _date, string memory _report) public  {
        uint maintenanceId = maintenanceCounts[_vehicleId]++;
        Maintenance memory newMaintenance = Maintenance({id: maintenanceId, date: _date, report: _report});
        maintenanceHistories[_vehicleId][maintenanceId] = newMaintenance;
    }

    function getMaintenance(string memory _vehicleId, uint _maintenanceId) public view returns (Maintenance memory) {
        require(_maintenanceId < maintenanceCounts[_vehicleId], "Maintenance does not exist");
        return maintenanceHistories[_vehicleId][_maintenanceId];
    }

    function getMaintenanceHistory(string memory _vehicleId) public view returns (Maintenance[] memory) {
        uint maintenanceCount = maintenanceCounts[_vehicleId];
        Maintenance[] memory maintenances = new Maintenance[](maintenanceCount);

        for (uint i = 0; i < maintenanceCount; i++) {
            maintenances[i] = maintenanceHistories[_vehicleId][i];
        }
        return maintenances;
    }

    function addOwnership(string memory _vehicleId,string memory name, string memory profession, uint _startYear, uint _endYear, uint _startKilometers, uint _endKilometers) public  {
        uint ownershipId = ownershipCounts[_vehicleId]++;
        Ownership memory newOwnership = Ownership({id: ownershipId, name:name, profession:profession, startYear: _startYear, endYear: _endYear, startKilometers:_startKilometers, endKilometers:_endKilometers});
        ownershipHistories[_vehicleId][ownershipId] = newOwnership;
    }

     function getOwnership(string memory _vehicleId, uint _ownershipId) public view returns (Ownership memory) {
        require(_ownershipId < ownershipCounts[_vehicleId], "Maintenance does not exist");
        return ownershipHistories[_vehicleId][_ownershipId];
    }

    function getOwnershipHistory(string memory _vehicleId) public view returns (Ownership[] memory) {
        uint ownershipCount = ownershipCounts[_vehicleId];
        Ownership[] memory ownerships = new Ownership[](ownershipCount);

        for (uint i = 0; i < ownershipCount; i++) {
            ownerships[i] = ownershipHistories[_vehicleId][i];
        }
        return ownerships;
    }
    
    function updatePartStatus(string memory _vehicleId, BumperStatus memory _bumpers, HoodStatus memory _hoods, PartStatusType _roof, FenderStatus memory _fenders, DoorStatus memory _doors) public  {
        PartStatus storage status = partStatuses[_vehicleId];
        status.bumpers = _bumpers;
        status.hoods = _hoods;
        status.roof = _roof;
        status.fenders = _fenders;
        status.doors = _doors;
    }

    function getCompleteVehicleDetails(string memory _vehicleId) public view returns (
        Vehicle memory vehicleDetails,
        Accident[] memory vehicleAccidentHistory,
        Maintenance[] memory vehicleMaintenanceHistory,
        Ownership[] memory vehicleOwnershipHistory,
        PartStatus memory vehiclePartStatus
    ) {
        vehicleDetails = vehicles[_vehicleId];
        vehicleAccidentHistory = getAccidentHistory(_vehicleId);
        vehicleMaintenanceHistory = getMaintenanceHistory(_vehicleId);
        vehicleOwnershipHistory = getOwnershipHistory(_vehicleId);
        vehiclePartStatus = partStatuses[_vehicleId];
    }

    function getPartStatus(string memory _vehicleId) public view returns (PartStatus memory) {
        return partStatuses[_vehicleId];
    }
}
