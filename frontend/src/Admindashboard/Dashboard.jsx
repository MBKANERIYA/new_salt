import React, { useState } from 'react';
import * as xlsx from 'xlsx';

const Dashboard = () => {
  const [excelData, setExcelData] = useState([]);
  const [excelError, setExcelError] = useState('');

  const readExcel = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const data = await file.arrayBuffer();
        const workbook = xlsx.read(data);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        console.log("Parsed Excel Data:", jsonData); // Debugging: Log the parsed data

        if (jsonData.length) {
          setExcelData(jsonData);
          setExcelError('');
        } else {
          setExcelError('No data found in the Excel sheet.');
        }
      } catch (error) {
        setExcelError('Error reading the Excel file. Please try again.');
        setExcelData([]);
      }
    } else {
      setExcelError('No file selected.');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <input type='file' className='form-control' accept='.xlsx, .xls' onChange={(e) => readExcel(e)} />
      </div>
      <div>
        {excelError && <p style={{ color: 'red' }}>{excelError}</p>}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {excelData.length > 0 ? (
              excelData.map((getdata, index) => (
                <tr key={index}>
                  <td>{getdata.Name || getdata.name || 'N/A'}</td> {/* Case-sensitive check */}
                  <td>{getdata.Email || getdata.email || 'N/A'}</td> {/* Case-sensitive check */}
                  <td>{getdata.Image || getdata.image || 'N/A'}</td> {/* Case-sensitive check */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No User Data is Present</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
