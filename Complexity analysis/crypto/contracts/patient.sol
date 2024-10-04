// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Healthcare {
    // Data structure to store patient information
    struct Patient {
        uint id; // Patient ID
        string name; // Patient name
        uint age; // Patient age
        string medicalHistory; // A brief medical history of the patient
    }

    // Mapping to store patient records, keyed by the patient ID
    mapping(uint => Patient) public patients;

    // Event to be emitted when a new patient is added
    event PatientAdded(uint id, string name, uint age, string medicalHistory);

    // Function to add a new patient to the system
    function addPatient(uint _id, string memory _name, uint _age, string memory _medicalHistory) public {
        // Add patient to the mapping
        patients[_id] = Patient(_id, _name, _age, _medicalHistory);
        // Emit an event when a new patient is added
        emit PatientAdded(_id, _name, _age, _medicalHistory);
    }

    // Function to retrieve patient information by ID
    function getPatient(uint _id) public view returns (string memory, uint, string memory) {
        // Fetch the patient from the mapping
        Patient memory patient = patients[_id];
        // Return the patient's information
        return (patient.name, patient.age, patient.medicalHistory);
    }

    // Function to update a patient's medical history
    function updateMedicalHistory(uint _id, string memory _newMedicalHistory) public {
        // Ensure the patient exists
        require(bytes(patients[_id].name).length != 0, "Patient does not exist.");
        // Update the patient's medical history
        patients[_id].medicalHistory = _newMedicalHistory;
    }
}
