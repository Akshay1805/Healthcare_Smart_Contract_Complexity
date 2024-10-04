const { expect } = require("chai");

describe("Healthcare", function () {
    let healthcare;

    // Before all tests, deploy the Healthcare contract
    before(async function () {
        const Healthcare = await ethers.getContractFactory("Healthcare");
        healthcare = await Healthcare.deploy(); // Deploy the contract and assign the instance
        // No need to call deployed() again as `deploy()` already returns the deployed contract instance.
        // await healthcare.deployed(); // This line can be removed
    });

    it("Should add a new patient", async function () {
        await expect(healthcare.addPatient(1, "John Doe", 30, "No history"))
            .to.emit(healthcare, "PatientAdded")
            .withArgs(1, "John Doe", 30, "No history");

        const [name, age, medicalHistory] = await healthcare.getPatient(1);
        expect(name).to.equal("John Doe");
        expect(age).to.equal(30);
        expect(medicalHistory).to.equal("No history");
    });

    it("Should update the patient's medical history", async function () {
        await healthcare.updateMedicalHistory(1, "Updated medical history");
        const [, , medicalHistory] = await healthcare.getPatient(1);
        expect(medicalHistory).to.equal("Updated medical history");
    });

    it("Should fail to update non-existing patient", async function () {
        await expect(healthcare.updateMedicalHistory(2, "New medical history"))
            .to.be.revertedWith("Patient does not exist.");
    });

    it("Should add multiple patients", async function () {
        await expect(healthcare.addPatient(2, "Jane Smith", 28, "No history"))
            .to.emit(healthcare, "PatientAdded")
            .withArgs(2, "Jane Smith", 28, "No history");

        await expect(healthcare.addPatient(3, "Alice Johnson", 35, "Allergic to penicillin"))
            .to.emit(healthcare, "PatientAdded")
            .withArgs(3, "Alice Johnson", 35, "Allergic to penicillin");

        const [name1] = await healthcare.getPatient(2);
        const [name2] = await healthcare.getPatient(3);
        expect(name1).to.equal("Jane Smith");
        expect(name2).to.equal("Alice Johnson");
    });
});
