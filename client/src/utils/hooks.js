import { useState } from 'react'
import { rewriteURIForGET } from '@apollo/client'

export const useForm = (callback, initialstate = {}) => {
    const [values, setValues] = useState(initialstate)

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        callback()
    } 

    return {
       onChange, onSubmit, values
    }
}