import { useEffect, useState } from 'react';
import './App.css';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const student = { name, age: parseInt(age) };

    if (editingId) {
      await updateDoc(doc(db, "students", editingId), student);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "students"), student);
    }

    setName("");
    setAge("");
    getStudents();
  };

  const deleteStudent = async (id) => {
    await deleteDoc(doc(db, "students", id));
    getStudents();
  };

  const getStudents = async () => {
    const q = query(collection(db, "students"));
    const querySnapshot = await getDocs(q);
    let studentsList = [];
    querySnapshot.forEach((doc) => {
      studentsList.push({ ...doc.data(), id: doc.id });
    });
    setStudents(studentsList);
  };

  const editStudent = (student) => {
    setName(student.name);
    setAge(student.age);
    setEditingId(student.id);
  };

  useEffect(() => {
    getStudents();

    const bubbleContainer = document.querySelector('.bubbles');

    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';

      const size = Math.random() * 60 + 20; // Size between 20px and 80px
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;

      const delay = Math.random() * 10; // Random delay between 0s and 10s
      bubble.style.animationDelay = `${delay}s`;

      bubbleContainer.appendChild(bubble);

      // Remove the bubble after it finishes rising
      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });
    };

    const intervalId = setInterval(createBubble, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <div className="bubbles"></div>
      <div className="container">
        <h1 className="headline">CRUD Operation with Firebase and React</h1>
        <form onSubmit={onSubmit} className="add-student">
          <div className="form-control">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <input type="submit" value={editingId ? "Update Student" : "Add Student"} />
        </form>
        <div className="students">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>
                    <button className="btn" onClick={() => editStudent(student)}>Edit</button>
                    <button className="btn" onClick={() => deleteStudent(student.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
