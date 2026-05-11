// import React, { useState } from 'react'
// import { utils, read } from 'xlsx'

// const ImportExcel = () => {
//     const [excelData, setExcelData] = useState([])
//     const [excelError, setExcelError] = useState('')
//     const file_type = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
//     const handleChange = (e) => {
//         const selected_file = e.target.files[0]
//         if (selected_file) {
//             if (selected_file && file_type.includes(selected_file.type)) {
//                 let reader = new FileReader();
//                 reader.onload = (e) =>{
//                     const workbook = read(e.target.result)
//                     const sheet = workbook.SheetNames;
//                     if(sheet.length){
//                         const data = utils.sheet_to_json(workbook.Sheets[sheet[0]]);
//                         setExcelData(data);
//                     }
//                 }
//                 reader.readAsArrayBuffer(selected_file)
//             } else {
//                 setExcelError("please upload only excel file");
//                 setExcelData([])
//             }
//         }
//     }
//     return (
//         <div>
//             <div>
//                 <input type='file' onChange={handleChange} />
//             </div>
//             <div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             excelData.length ? excelData.map((info)=>(
//                                 <tr>
//                                     <td>{info.Name}</td>
//                                     <td>{info.Image}</td>
//                                 </tr>
//                             )
//                             )
//                                 : excelError.length ?  <tr>{excelError}</tr>:
//                                 <tr>No User Data is Present</tr>
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default ImportExcel

import React, { useState } from 'react'
import *as xlsx from 'xlsx'

const ImportExcel = () => {
    const [excelData , setExcelData] = useState([])
    const readExcel = async(e)=>{
        const file = e.target.files[0]
        const data = await file.arrayBuffer(file)
        const excelfile = xlsx.read(data);
        const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
        const exceljson = xlsx.utils.sheet_to_json(excelsheet);
        // console.log(exceljson)
        setExcelData(exceljson)
    }
    return (
        <div>
            <div>
                <input type='file' className='form-control' onChange={(e) => readExcel(e)} />
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            excelData.map((getdata,index)=>(
                                <tr key={index}>
                                    <td>{getdata.Title}</td>
                                    <td>{getdata.Email}</td>
                                    <td>{getdata.Image}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ImportExcel