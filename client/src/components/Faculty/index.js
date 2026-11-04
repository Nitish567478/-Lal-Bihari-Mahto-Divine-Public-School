import React from "react";
import './index.css';

import Header from "../Header";
import Footer from "../Footer";

const getRandomGenderImage = () => {
  const gender = Math.random() < 0.5 ? "men" : "women";
  const id = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
};

const facultyData = [
  { name: "Dr. Anil Sharma", designation: "Principal", subject: "Administration", email: "anil.sharma@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Prof. Sunita Verma", designation: "Senior Science Teacher", subject: "Physics & Chemistry", email: "sunita.verma@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Mr. Rajesh Kumar", designation: "Mathematics Teacher", subject: "Mathematics", email: "rajesh.kumar@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Ms. Priya Singh", designation: "English Teacher", subject: "English Literature", email: "priya.singh@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Mr. Amit Gupta", designation: "Computer Science Teacher", subject: "Computer Science", email: "amit.gupta@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Ms. Neha Joshi", designation: "Biology Teacher", subject: "Biology", email: "neha.joshi@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Mr. Vikram Singh", designation: "History Teacher", subject: "History", email: "vikram.singh@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Ms. Anjali Mehta", designation: "Geography Teacher", subject: "Geography", email: "anjali.mehta@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Mr. Suresh Patil", designation: "Physical Education Teacher", subject: "Sports", email: "suresh.patil@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Ms. Ritu Kapoor", designation: "Music Teacher", subject: "Music", email: "ritu.kapoor@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Mr. Manoj Reddy", designation: "Arts Teacher", subject: "Arts", email: "manoj.reddy@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Ms. Shalini Rao", designation: "Chemistry Teacher", subject: "Chemistry", email: "shalini.rao@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Mr. Deepak Jain", designation: "Physics Teacher", subject: "Physics", email: "deepak.jain@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Ms. Kavita Nair", designation: "English Teacher", subject: "English Literature", email: "kavita.nair@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
  { name: "Mr. Rohan Desai", designation: "Mathematics Teacher", subject: "Mathematics", email: "rohan.desai@ibmdps.edu.in", imageUrl: getRandomGenderImage() },
];

const Faculty = () => {
  return (
    <>
    <Header />
    <div className="faculty-section">
      <h1 className="faculty-heading">Meet Our Faculty</h1>
      <div className="faculty-cards">
        {facultyData.map((faculty, index) => (
          <div className="faculty-card" key={index}>
            <img
              src={faculty.imageUrl}
              alt={faculty.name}
              className="faculty-image"
            />
            <h3 className="faculty-name">{faculty.name}</h3>
            <p className="faculty-designation">{faculty.designation}</p>
            <p className="faculty-subject">Subject: {faculty.subject}</p>
            <p className="faculty-email">Email: {faculty.email}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Faculty;
