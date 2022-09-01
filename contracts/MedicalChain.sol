// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MedicalChain {
    mapping(address => Doctor) DoctorInfo;
    mapping(address => Patient) PatientInfo;
    mapping(address => mapping(address => HealthRecords)) HealthInfo;
    mapping(address => mapping(address => uint256)) private patientToDoctor;

    event DrDetailsAdded(address admin, address doctor);
    event PatDetailsAdded(address doctor, address patient);
    event HealthRecordsAdded(address dr, address patient);
    event GrantAccessToDr(address dr, address patient);

    modifier OnlyOwner() {
        require(msg.sender == owner, "ONLY ADMIN IS ALLOWED");
        _;
    }

    modifier Only_Doctors() {
        require(
            DoctorInfo[msg.sender].state == true,
            "REGISTERED DOCTORS ONLY"
        );
        _;
    }

    modifier Only_Patients(address sender) {
        require(PatientInfo[sender].state == true, "REGISTERED PATIENTS ONLY");
        _;
    }

    address public owner;
    uint256 amt = 1e16;

    constructor() {
        owner = msg.sender;
    }

    struct Doctor {
        bool state; // To check whether the doctor is registered or not
        address dr_Id; // Address of doctor
        string d_Name; // Name of doctor
    }

    struct Patient {
        bool state; // To check whether patient is genuine
        address pa_Id; // Address of registered patient
        string pa_Name; // Name of Patient Name
        string[] pa_Records; // Used to store the prescription records of corresponding patients
    }

    struct PrescriptionDetails {
        string prescription; // prescription details of patient given by doctor
    }

    struct HealthRecords {
        Doctor d;
        Patient p;
        PrescriptionDetails pre;
        string[] records; // Used to store prescription records of patient w.r.t doctor
    }

    // Function to add Doctor details, done by admin only
    function setDoctorDetails(
        bool _state,
        address _drId,
        string memory _name
    ) external payable OnlyOwner {
        require(msg.value >= amt, "Payment Incomplete");
        DoctorInfo[_drId] = Doctor(_state, _drId, _name);
        emit DrDetailsAdded(msg.sender, _drId);
    }

    // Function to get Doctor details for admin
    function getDoctorDetails(address _Id)
        public
        view
        OnlyOwner
        returns (
            bool _state,
            address _drId,
            string memory _name
        )
    {
        _state = DoctorInfo[_Id].state;
        _drId = DoctorInfo[_Id].dr_Id;
        _name = DoctorInfo[_Id].d_Name;
    }

    // Function to add HealthRecords of patients, done by registered doctors only
    function setHealthRecordsDetails(
        string memory _paName,
        address _paId,
        string memory _prescription
    ) public Only_Doctors {
        HealthInfo[msg.sender][_paId].d.d_Name = DoctorInfo[msg.sender].d_Name;
        HealthInfo[msg.sender][_paId].d.dr_Id = DoctorInfo[msg.sender].dr_Id;
        HealthInfo[msg.sender][_paId].p.state = true;
        HealthInfo[msg.sender][_paId].p.pa_Id = _paId;
        HealthInfo[msg.sender][_paId].p.pa_Name = _paName;
        HealthInfo[msg.sender][_paId].pre.prescription = _prescription;
        HealthInfo[msg.sender][_paId].records.push(_prescription);
        PatientInfo[_paId].pa_Records.push(_prescription);
        setPatientDetails(
            HealthInfo[msg.sender][_paId].p.state,
            HealthInfo[msg.sender][_paId].p.pa_Id,
            HealthInfo[msg.sender][_paId].p.pa_Name,
            PatientInfo[_paId].pa_Records
        );
        emit HealthRecordsAdded(msg.sender, _paId);
    }

    // Function to add Patient details, done by registered doctors only
    function setPatientDetails(
        bool _state,
        address _paId,
        string memory _paName,
        string[] memory _paRecords
    ) public payable Only_Doctors {
        require(msg.value >= amt, "Payment Incomplete");
        PatientInfo[_paId] = Patient(_state, _paId, _paName, _paRecords);
        emit PatDetailsAdded(msg.sender, _paId);
    }

    function toString(address account) public pure returns (string memory) {
        return toString1(abi.encodePacked(account));
    }

    function toString1(bytes memory data) public pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < data.length; i++) {
            str[2 + i * 2] = alphabet[uint256(uint8(data[i] >> 4))];
            str[3 + i * 2] = alphabet[uint256(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }

    // Function to get Patient details
    function getPatientDetails(address sender, address _Id)
        public
        view
        returns (
            bool _state,
            address _paId,
            string memory _paName,
            string[] memory _paRecords
        )
    {
        require(
            PatientInfo[sender].state == true ||
                patientToDoctor[_Id][sender] == 1,
            toString(sender)
        );
        _state = PatientInfo[_Id].state;
        _paId = PatientInfo[_Id].pa_Id;
        _paName = PatientInfo[_Id].pa_Name;
        _paRecords = PatientInfo[_Id].pa_Records;
    }

    // Function to get HealthRecords only for registered patients
    function getHealthRecords(address sender, address _dr)
        public
        view
        Only_Patients(sender)
        returns (
            string memory _drName,
            address _drId,
            string memory _paName,
            address _paId,
            string memory _prescription,
            string[] memory _rec
        )
    {
        _drName = HealthInfo[_dr][sender].d.d_Name;
        _drId = HealthInfo[_dr][sender].d.dr_Id;
        _paName = HealthInfo[_dr][sender].p.pa_Name;
        _paId = HealthInfo[_dr][sender].p.pa_Id;
        _prescription = HealthInfo[_dr][sender].pre.prescription;
        _rec = HealthInfo[_dr][sender].records;
    }

    // Function to grant access to doctor ,so that the doctors with access can view the corresponding patients HealthRecords
    function grantAccessToDoctor(
        address sender,
        address doctor_id,
        uint256 access
    ) public {
        require(PatientInfo[sender].state == true, toString(sender));
        patientToDoctor[sender][doctor_id] = access;
        emit GrantAccessToDr(doctor_id, sender);
    }

    // Function to get HealthRecords only for registered Doctors
    function getHealthRecordsForDoctor(address _paId)
        public
        view
        Only_Doctors
        returns (
            string memory _drName,
            address _drId,
            string memory _paName,
            address _pId,
            string memory _prescription,
            string[] memory _rec
        )
    {
        require(
            patientToDoctor[_paId][msg.sender] == 1,
            "DR ACCESS NOT GRANTED"
        );
        _drName = HealthInfo[msg.sender][_paId].d.d_Name;
        _drId = HealthInfo[msg.sender][_paId].d.dr_Id;
        _paName = HealthInfo[msg.sender][_paId].p.pa_Name;
        _pId = HealthInfo[msg.sender][_paId].p.pa_Id;
        _prescription = HealthInfo[msg.sender][_paId].pre.prescription;
        _rec = HealthInfo[msg.sender][_paId].records;
    }
}
