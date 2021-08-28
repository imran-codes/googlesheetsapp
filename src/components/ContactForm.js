import React from 'react'
import '../styles/ContactForm.css'
import {Button} from '@material-ui/core';
import axios from 'axios';
import { useForm } from "react-hook-form";
import {useState, useEffect} from 'react'

function ContactForm() {// eslint-disable-next-line
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [gettableData, setGetTableData] = useState([]);

  useEffect(() => {
   fetchData();
  }, [])


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
      // fetchData();
      console.log(res)
    })
    .catch(error => alert(error.message));
  };

  return (
    <div className="contactForm">
        <h1>People's List</h1>
       
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
       

            <form onSubmit={handleSubmit(submitForm)}>
              <input 
              required
              type = 'text'
              placeholder= 'Name'
              {...register('name', { required: true })} 
              error = {errors.name}
              helperText = {errors.name && 'The name is required'}
              />
              <input
              required
              type = 'number'
              placeholder= 'Age'
              {...register('age', { required: true })}
              error = {errors.age}
              helperText = {errors.age && 'The age is required'}
              />
              <input
              required
              type = 'number'
              placeholder= 'Salary'
              {...register('salary', { required: true })}
              error = {errors.salary}
              helperText = {errors.salary && 'The salary is required'}
              />
              <input
              required
              type = 'text'
              placeholder= 'Hobby'
              {...register('hobby', { required: true })}
              error = {errors.hobby}
              helperText = {errors.hobby && 'The hobby is required'}
              />
              <Button type = 'submit'>Submit</Button>
            </form>
      </div>
  )
}

export default ContactForm
