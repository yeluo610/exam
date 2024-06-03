import React, { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

interface UserDataProps {
  userId: string;
}
// props解构
const UserData: React.FC<UserDataProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [seconds, setSeconds] = useState<number>(0);

  // 根据userId判断是否要变化
  useEffect(() => {
    const fetchUserData = () => {
      fetch(`https://secret.url/user/${userId}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error('Error fetching user data:', error));
    };

    fetchUserData();
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds:number) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [userId]);

  return (
    <div>
    <h1>User Data Component < /h1>
  {
    user ? (
      <div>
      <p>Name: { user.name } < /p>
      < p > Email: { user.email } </p>
        < /div>
      ) : (
  <p>Loading user data...</p>
      )}
<p>Timer: { seconds } seconds < /p>
  < /div>
  );
};

export default UserData;
