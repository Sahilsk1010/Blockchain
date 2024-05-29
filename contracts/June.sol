// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract June {
    struct Student {
        string name;
        string course;
        string usn; // Add USN number
        uint256 completionTimestamp;
        address studentAddress;
    }

    Student[] students;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function addStudent(string memory name, string memory course, string memory usn) public payable {
        
        owner.transfer(msg.value);
        students.push(Student(name, course, usn, block.timestamp, msg.sender));
    }

    function getStudents() public view returns (Student[] memory) {
        return students;
    }
}
