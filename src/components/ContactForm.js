import React from 'react'
import '../styles/ContactForm.css'
import {Button} from '@material-ui/core';
import axios from 'axios';
import { useForm } from "react-hook-form";
import {useState, useEffect} from 'react'

function ContactForm() {// eslint-disable-next-line
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const [gettableData, setGetTableData] = useState([]);
  //const [placeholder, setPlaceholder] = useState('')
  const [totalSalaries, setTotalSalaries] = useState(0)

  useEffect(() => {
   fetchData();
  }, [])

  // total salaries using reduce
  useEffect(() => {
    const total = gettableData.reduce(
      (total, row) => (total = total + Number(row.salary)), 
      0
      )
      setTotalSalaries(total)
   }, [gettableData])


  const fetchData = () => {
     //fetch google sheets data
     axios
     .get('https://sheet.best/api/sheets/011fab32-8d16-4dca-b6d2-6d8cb9e68ee4' 
     )
     .then((res) => {
       console.log(res.data);
       setGetTableData(res.data)
     })
     .catch(error => alert(error.message));
  }
  
  
  const submitForm = (data) => {
    console.log('submitted')
    const {name, age, salary, hobby} = data;

    const tableData = {
      // key and value
      name: name,
      age: age,
      salary: salary,
      hobby: hobby,
    }
  
    //Post google sheets data
    axios
    .post('https://sheet.best/api/sheets/011fab32-8d16-4dca-b6d2-6d8cb9e68ee4', 
    tableData
    )
    .then((res) => {
      alert('row successfully added')
      //more efficient method of updating instead of fetching again
      setGetTableData([...gettableData, tableData])
       //fetchData();
       reset({
         name: '',
         age: null,
         salary: null, 
         hobby: ''
       })
      console.log(res)
    })
    .catch(error => alert(error.message));
  };



  return (
    <div className="contactForm">

      <div className="list">
            <h2>Annual expenses (Total Salaries):  £{totalSalaries}</h2>
          
              <table>
                <tbody>
                  {gettableData.map(({age, hobby, name, salary}) => (
                    <tr>
                      <td><strong>Name:</strong> {name}</td>
                      <td><strong>Age:</strong> {age}</td>
                      <td><strong>Salary:</strong> {salary}</td>
                      <td><strong>Hobby:</strong> {hobby}</td>
                    </tr>
                    ))}
                </tbody>
              </table>
      </div>
        
       

            <form onSubmit={handleSubmit(submitForm)}>
              <input 
              type = 'text'
              placeholder= 'Name'
              {...register('name', { required: true })} 
              />
              {errors.name?.type === 'required' && <p className = 'errors'>Name is required</p>}

              <input
              type = 'number'
              placeholder= 'Age'
              {...register('age', { required: true })}
              />
              {errors.age?.type === 'required' && <p className = 'errors'>Age is required</p>}
              
              <input
              type = 'number'
              placeholder= 'Salary'
              {...register('salary', { required: true })}
              />
              {errors.salary?.type === 'required' && <p className = 'errors'>Salary is required</p>}

              <input
              type = 'text'
              placeholder= 'Hobby'
              {...register('hobby', { required: true })}   
              />
              {errors.hobby?.type === 'required' && <p className = 'errors'>Hobby is required</p>}

              <Button variant="contained" color="primary" type = 'submit'>Submit</Button>
            </form>
      </div>
  )
}

export default ContactForm
