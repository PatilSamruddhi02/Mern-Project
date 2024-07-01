// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// } from 'chart.js';
// import { Bar, Doughnut, Pie } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const Charts = () => {
//   const [userCount, setUserCount] = useState(0);
//   const [bookCount, setBookCount] = useState(0);
//   const [purchaseCount, setPurchaseCount] = useState(0);
//   const [publisherCount, setPublisherCount] = useState(0);
//   const [authorCount, setAuthorCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersResponse = await axios.get('http://localhost:8000/users');
//         const booksResponse = await axios.get('http://localhost:8000/books');
//         const purchasesResponse = await axios.get('http://localhost:8000/api/purchases');
//         const inquiriesResponse = await axios.get('http://localhost:8000/inquiries'); // Assuming this endpoint returns inquiries

//         console.log('Users:', usersResponse.data); // Add logging
//         console.log('Books:', booksResponse.data); // Add logging
//         console.log('Purchases:', purchasesResponse.data); // Add logging
//         console.log('Inquiries:', inquiriesResponse.data); // Add logging

//         setUserCount(usersResponse.data.length);
//         setBookCount(booksResponse.data.length);
//         setPurchaseCount(purchasesResponse.data.length);
        
//         // Assuming publishers and authors are part of inquiries data or you have another way to count them
//         const publishers = new Set(inquiriesResponse.data.map(inquiry => inquiry.publisherId));
//         const authors = new Set(inquiriesResponse.data.map(inquiry => inquiry.authorId));
//         setPublisherCount(publishers.size);
//         setAuthorCount(authors.size);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const barData = {
//     labels: ['Users', 'Books', 'Purchased Books', 'Publishers', 'Authors'],
//     datasets: [
//       {
//         label: 'Count',
//         data: [userCount, bookCount, purchaseCount, publisherCount, authorCount],
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const doughnutData = {
//     labels: ['Authors', 'Publishers'],
//     datasets: [
//       {
//         data: [authorCount, publisherCount],
//         backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
//         borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const pieData = {
//     labels: ['Total Books', 'Purchased Books'],
//     datasets: [
//       {
//         data: [bookCount, purchaseCount],
//         backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
//         borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2 className='mt-56'>Statistics</h2>
//       <div>
//         <h3>Bar Chart</h3>
//         <div style={{ width: '100%', marginBottom: '20px', minWidth: '600px' }}>
//           <Bar data={barData} />
//         </div>
//       </div>
//       <div style={{ display: 'flex' }}>
//         <div style={{ flex: 1, marginRight: '10px' }}>
//           <h3>Donut Chart</h3>
//           <Doughnut data={doughnutData} />
//         </div>
//         <div style={{ flex: 1, marginLeft: '10px' }}>
//           <h3>Pie Chart</h3>
//           <Pie data={pieData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charts;






import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Bar, Doughnut, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const Charts = () => {
  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [publisherCount, setPublisherCount] = useState(0);
  const [authorCount, setAuthorCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);

  useEffect(() => {
    // Generate random values for the counts
    setUserCount(Math.floor(Math.random() * 1000) + 1);
    setBookCount(Math.floor(Math.random() * 500) + 1);
    setPurchaseCount(Math.floor(Math.random() * 200) + 1);
    setPublisherCount(Math.floor(Math.random() * 80) + 1);
    setAuthorCount(Math.floor(Math.random() * 200) + 1);
    setInquiryCount(Math.floor(Math.random() * 300) + 1);
  }, []);

  const barData = {
    labels: ['Users', 'Books', 'Purchased Books', 'Publishers', 'Authors', 'Inquiries'],
    datasets: [
      {
        label: 'Count',
        data: [userCount, bookCount, purchaseCount, publisherCount, authorCount, inquiryCount],
        backgroundColor: [
          'rgba(0, 123, 255, 0.8)',
          'rgba(40, 167, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(220, 53, 69, 0.8)',
          'rgba(23, 162, 184, 0.8)',
          'rgba(108, 117, 125, 0.8)',
        ],
        borderColor: [
          'rgba(0, 123, 255, 1)',
          'rgba(40, 167, 69, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(23, 162, 184, 1)',
          'rgba(108, 117, 125, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Authors', 'Publishers'],
    datasets: [
      {
        data: [authorCount, publisherCount],
        backgroundColor: ['rgba(220, 53, 69, 0.8)', 'rgba(0, 123, 255, 0.8)'],
        borderColor: ['rgba(220, 53, 69, 1)', 'rgba(0, 123, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const pieDataBooks = {
    labels: ['Total Books', 'Purchased Books'],
    datasets: [
      {
        data: [bookCount, purchaseCount],
        backgroundColor: ['rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'],
        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const pieDataUsers = {
    labels: ['Total Users', 'Inquiries'],
    datasets: [
      {
        data: [userCount, inquiryCount],
        backgroundColor: ['rgba(23, 162, 184, 0.8)', 'rgba(255, 193, 7, 0.8)'],
        borderColor: ['rgba(23, 162, 184, 1)', 'rgba(255, 193, 7, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Inquiries Over Time',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(40, 167, 69, 0.8)',
        borderColor: 'rgba(40, 167, 69, 1)',
      },
    ],
  };

  return (
    <div style={{ width: '90%', margin: '0 auto', marginTop: '850px' }}>
      <h2 className='mb-4 text-5xl' style={{ textAlign: 'center' }}>Statistics Overview</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <div style={{ width: '80%', minWidth: '500px' }}>
          <h3 style={{ textAlign: 'center' ,}} className='text-2xl'>Users, Books, Purchases, Publishers, Authors, Inquiries</h3>
          <Bar data={barData} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <div style={{ flex: 1, marginRight: '10px', maxWidth: '30%' }}>
          <h3 style={{ textAlign: 'center' }} className='text-2xl'>Books</h3>
          <Pie data={pieDataBooks} />
        </div>
        <div style={{ flex: 1, marginLeft: '10px', marginRight: '10px', maxWidth: '30%' }}>
          <h3 style={{ textAlign: 'center' }} className='text-2xl'>Authors & Publishers</h3>
          <Doughnut data={doughnutData} />
        </div>
        <div style={{ flex: 1, marginLeft: '10px', maxWidth: '30%' }}>
          <h3 style={{ textAlign: 'center' }} className='text-2xl'>Users & Inquiries</h3>
          <Pie data={pieDataUsers} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ width: '70%' }}>
          <h3 style={{ textAlign: 'center' }} className='text-2xl'>Inquiries Over Time</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
