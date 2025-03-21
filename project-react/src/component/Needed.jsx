// import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Needed = () => {
  const [neededList, setNeededList] = useState([]);
  const [user1, setUser1] = useState('');
  const [newNeeded, setNewNeeded] = useState({
    nameProfessional: '',
    mailProfessional: '',
    phoneProfessional: '',
    nameCategory: '',
    nameUser: null,
    mailUser: null,
    phoneUser: null
  });
  const [editNeeded, setEditNeeded] = useState(null);  // סטייט עבור עורך עדכון דרוש

  // סטייט לטופס הוספת דרוש
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        setUser1(parsedUser);
      }
    }
  }, []);

  // שליפת כל הדרושים בעת הטעינה של הקומפוננטה
  useEffect(() => {
    axios.get('http://localhost:8080/api/needed/getAllNeeded')
      .then((response) => {
        setNeededList(response.data); // עדכון הרשימה עם כל הדרושים
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // מחיקת דרוש
  const deleteNeeded = (id) => {
    axios.delete(`http://localhost:8080/api/needed/deleteNeddedById/${id}`)
      .then(() => {
        // אחרי שמחקנו, מעדכנים את הרשימה
        setNeededList(neededList.filter(needed => needed.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  // שליחת מייל לאיש מקצוע
  const sendMail = (needed) => {
    const email = {
      subject: 'הצעה עבור דרוש',
      body: `שלום, אני מעוניין במשרה/פרויקט שפרסמת. פרטים: ${needed.nameCategory}`,
      to: needed.mailProfessional, // מייל של איש המקצוע
    };

    axios.post('http://localhost:8080/sendMail', email)
      .then((response) => {
        alert('ההודעה נשלחה בהצלחה!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  // פונקציה להוספת דרוש
  const addNeeded = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/needed/addNeeded', newNeeded)
      .then((response) => {
        // עדכון הרשימה עם הדרוש החדש
        setNeededList([...neededList, response.data]);
        // איפוס שדות הטופס לאחר ההגשה
        setNewNeeded({
          nameProfessional: '',
          mailProfessional: '',
          phoneProfessional: '',
          nameCategory: '',
          nameUser: null,
          mailUser: null,
          phoneUser: null
        });
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  // עדכון ערכי טופס הוספת דרוש
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewNeeded({ ...newNeeded, [name]: value });
  };

  // פונקציה לעדכון דרוש
  const updateNeeded = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8080/api/needed/updateNeeded//${editNeeded.id}`, editNeeded)
      .then((response) => {
        setNeededList(neededList.map((needed) => needed.id === editNeeded.id ? response.data : needed));
        setEditNeeded(null); // סגירת חלונית העדכון
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  // חלונית עדכון הדרוש
  const openEditModal = (needed) => {
    setEditNeeded({ ...needed });
  };

  // עדכון טופס עדכון הדרוש
  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditNeeded({ ...editNeeded, [name]: value });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>דרושים</h1>

      {/* טופס להוספת דרוש */}
      <h2>הוסף דרוש</h2>
      <form onSubmit={addNeeded}>
        <div>
          <label>שם מקצוע: </label>
          <input
            type="text"
            name="nameProfessional"
            value={newNeeded.nameProfessional}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>מייל איש מקצוע: </label>
          <input
            type="email"
            name="mailProfessional"
            value={newNeeded.mailProfessional}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>טלפון איש מקצוע: </label>
          <input
            type="text"
            name="phoneProfessional"
            value={newNeeded.phoneProfessional}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>קטגוריה: </label>
          <input
            type="text"
            name="nameCategory"
            value={newNeeded.nameCategory}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">הוסף דרוש</button>
      </form>

      {/* הצגת הודעה אם אין דרושים */}
      {neededList.length === 0 ? (
        <p>אין דרושים כרגע</p>
      ) : (
        <ul>
          {neededList.map((needed) => (
            <li key={needed.id} style={{ marginBottom: '20px' }}>
              <div><strong>שם מקצוע:</strong> {needed.nameProfessional}</div>
              <div><strong>קטגוריה:</strong> {needed.nameCategory}</div>
              <button onClick={() => sendMail(needed)} style={{ marginRight: '10px' }}>
                שלח הודעה לאיש מקצוע
              </button>
              <button onClick={() => deleteNeeded(needed.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                מחק דרוש
              </button>
              {/* אם משתמש רוצה לעדכן את הדרוש */}
              <button onClick={() => openEditModal(needed)}>
                עדכון פרטי דרוש
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* חלונית עדכון דרוש */}
      {editNeeded && (
        <div>
          <h2>עדכן דרוש</h2>
          <form onSubmit={updateNeeded}>
            <div>
              <label>שם משתמש: </label>
              <input
                type="text"
                name="nameUser"
                value={editNeeded.nameUser || ''}
                onChange={handleEditInputChange}
              />
            </div>
            <div>
              <label>מייל משתמש: </label>
              <input
                type="email"
                name="mailUser"
                value={editNeeded.mailUser || ''}
                onChange={handleEditInputChange}
              />
            </div>
            <div>
              <label>טלפון משתמש: </label>
              <input
                type="text"
                name="phoneUser"
                value={editNeeded.phoneUser || ''}
                onChange={handleEditInputChange}
              />
            </div>
            <button type="submit">עדכן דרוש</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Needed;
