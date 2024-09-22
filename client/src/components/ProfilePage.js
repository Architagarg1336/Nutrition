import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = ({ token }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  
  // Fetch the profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const { name, email, age, gender, profilePhoto } = response.data;
        setName(name);
        setEmail(email);
        setAge(age || '');
        setGender(gender || '');
        setProfilePhoto(profilePhoto || '');
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSaveProfile = async () => {
    try {
      const profileData = { age, gender, profilePhoto };
      await axios.put('/api/auth/profile', profileData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile', error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <label>Name: </label>
        <input type="text" value={name} disabled />
      </div>
      <div>
        <label>Email: </label>
        <input type="email" value={email} disabled />
      </div>
      <div>
        <label>Age: </label>
        <input type="number" value={age} onChange={e => setAge(e.target.value)} />
      </div>
      <div>
        <label>Gender: </label>
        <input type="text" value={gender} onChange={e => setGender(e.target.value)} />
      </div>
      <div>
        <label>Profile Photo URL: </label>
        <input type="text" value={profilePhoto} onChange={e => setProfilePhoto(e.target.value)} />
      </div>
      <button onClick={handleSaveProfile}>Save Profile</button>
    </div>
  );
};

export default ProfilePage;
